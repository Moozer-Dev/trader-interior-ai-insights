
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const config = require('./config');

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.env === 'production' ? { rejectUnauthorized: false } : false
});

// Esquema de banco de dados
const schema = `
-- Tabelas principais
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  features JSONB,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES plans(id),
  status VARCHAR(50) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_data (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL,
  price DECIMAL(20, 2) NOT NULL,
  change_percent DECIMAL(10, 2),
  volume VARCHAR(50),
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_assets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  quantity DECIMAL(20, 8) NOT NULL,
  initial_price DECIMAL(20, 8) NOT NULL,
  purchase_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  quantity DECIMAL(20, 8) NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  type VARCHAR(20) NOT NULL,
  date TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  value DECIMAL(20, 2) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(20, 2),
  percentage DECIMAL(10, 2),
  condition VARCHAR(20) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  triggered BOOLEAN DEFAULT FALSE,
  triggered_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_analyses (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20),
  data JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabelas de autenticação e configuração
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS integrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  api_key VARCHAR(255),
  config JSONB,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'BRL',
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status INTEGER NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(50) DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'pt-BR',
  notifications BOOLEAN DEFAULT TRUE,
  risk_tolerance VARCHAR(50) DEFAULT 'medium',
  preferences JSONB,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_financial_data_symbol ON financial_data(symbol);
CREATE INDEX IF NOT EXISTS idx_financial_data_timestamp ON financial_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_user_assets_user_id ON user_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_history_user_id ON portfolio_history(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_symbol ON alerts(symbol);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_user_id ON ai_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_symbol ON ai_analyses(symbol);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_api_requests_user_id ON api_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_api_requests_timestamp ON api_requests(timestamp);
`;

// Dados iniciais
async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Inserir planos
    await client.query(`
      INSERT INTO plans (name, price, description, features) VALUES
      ('Free', 0.00, 'Acesso limitado a funcionalidades básicas', '{"data_delay": "15min", "max_alerts": 3, "ai_access": false, "api_access": false}'),
      ('Pro', 49.90, 'Acesso completo a todas as funcionalidades', '{"data_delay": "real-time", "max_alerts": 20, "ai_access": true, "api_access": false}'),
      ('API', 99.90, 'Acesso completo com uso via API externa', '{"data_delay": "real-time", "max_alerts": 50, "ai_access": true, "api_access": true}')
      ON CONFLICT DO NOTHING;
    `);
    
    // Inserir configurações
    await client.query(`
      INSERT INTO settings (key, value, description) VALUES
      ('market_data_provider', 'alphaVantage', 'Provedor de dados de mercado padrão'),
      ('ai_models_enabled', 'true', 'Status de disponibilidade dos modelos de IA'),
      ('max_portfolio_assets_free', '5', 'Número máximo de ativos no portfólio para plano Free'),
      ('max_portfolio_assets_pro', '50', 'Número máximo de ativos no portfólio para plano Pro'),
      ('max_portfolio_assets_api', '100', 'Número máximo de ativos no portfólio para plano API')
      ON CONFLICT DO NOTHING;
    `);
    
    // Inserir integrações
    await client.query(`
      INSERT INTO integrations (name, type, active) VALUES
      ('Alpha Vantage', 'market_data', true),
      ('Twelve Data', 'market_data', true),
      ('Yahoo Finance', 'market_data', true),
      ('Finnhub', 'market_data', true),
      ('MetaTrader', 'market_data', true),
      ('PagBank', 'payment', true),
      ('Mercado Pago', 'payment', true)
      ON CONFLICT DO NOTHING;
    `);
    
    // Criar usuário admin para testes
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await client.query(`
      INSERT INTO users (name, email, password, role) VALUES
      ('Administrador', 'admin@traderpro.com', $1, 'admin')
      ON CONFLICT (email) DO NOTHING;
    `, [hashedPassword]);
    
    await client.query('COMMIT');
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Inicializar banco de dados
async function initializeDatabase() {
  try {
    // Criar tabelas
    await pool.query(schema);
    
    // Inserir dados iniciais
    await seedDatabase();
    
    console.log('Inicialização do banco de dados concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a inicialização do banco de dados:', error);
    process.exit(1);
  } finally {
    pool.end();
  }
}

// Executar inicialização
initializeDatabase();
