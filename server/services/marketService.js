
const db = require('../db');
const config = require('../config');
const { getDataFromProvider } = require('../utils/marketDataProvider');

// Obter dados gerais do mercado
async function getMarketData() {
  try {
    // Verificar provedor de dados configurado no banco
    const [provider] = await db.query('SELECT value FROM settings WHERE key = $1', ['market_data_provider']);
    
    // Usar o provedor configurado ou o default
    const dataProvider = provider?.value || 'alphaVantage';
    
    // Obter dados das principais ações (top 5)
    const topStocks = await getDataFromProvider(dataProvider, 'top_stocks', 5);
    
    // Obter os outros tipos de dados
    const stocks = await getDataFromProvider(dataProvider, 'stocks', 20);
    const crypto = await getDataFromProvider(dataProvider, 'crypto', 10);
    const forex = await getDataFromProvider(dataProvider, 'forex', 10);
    
    // Atualizar timestamp
    const lastUpdated = new Date().toISOString();
    
    // Salvar dados no banco para histórico
    await saveMarketDataToDb(topStocks, stocks, crypto, forex);
    
    return {
      topStocks,
      stocks,
      crypto,
      forex,
      lastUpdated
    };
  } catch (error) {
    console.error('Erro ao obter dados de mercado:', error);
    throw error;
  }
}

// Obter cotação específica
async function getQuote(symbol) {
  try {
    // Verificar provedor de dados configurado
    const [provider] = await db.query('SELECT value FROM settings WHERE key = $1', ['market_data_provider']);
    
    // Usar o provedor configurado ou o default
    const dataProvider = provider?.value || 'alphaVantage';
    
    // Obter cotação atualizada
    const quote = await getDataFromProvider(dataProvider, 'quote', null, symbol);
    
    return quote;
  } catch (error) {
    console.error(`Erro ao obter cotação para ${symbol}:`, error);
    throw error;
  }
}

// Obter histórico de preços
async function getHistoricalData(symbol, interval = 'daily', range = '1y') {
  try {
    // Verificar provedor de dados configurado
    const [provider] = await db.query('SELECT value FROM settings WHERE key = $1', ['market_data_provider']);
    
    // Usar o provedor configurado ou o default
    const dataProvider = provider?.value || 'alphaVantage';
    
    // Obter dados históricos
    const data = await getDataFromProvider(dataProvider, 'historical', null, symbol, { interval, range });
    
    return data;
  } catch (error) {
    console.error(`Erro ao obter histórico para ${symbol}:`, error);
    throw error;
  }
}

// Pesquisar ativos
async function searchAssets(query, type = 'stocks') {
  try {
    // Verificar provedor de dados configurado
    const [provider] = await db.query('SELECT value FROM settings WHERE key = $1', ['market_data_provider']);
    
    // Usar o provedor configurado ou o default
    const dataProvider = provider?.value || 'alphaVantage';
    
    // Pesquisar ativos
    const results = await getDataFromProvider(dataProvider, 'search', null, query, { type });
    
    return results;
  } catch (error) {
    console.error(`Erro ao pesquisar ativos com query "${query}":`, error);
    throw error;
  }
}

// Salvar dados no banco para histórico
async function saveMarketDataToDb(topStocks, stocks, crypto, forex) {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const timestamp = new Date();
    
    // Salvar dados de ações
    for (const stock of [...topStocks, ...stocks]) {
      await client.query(
        'INSERT INTO financial_data (symbol, type, price, change_percent, volume, timestamp) VALUES ($1, $2, $3, $4, $5, $6)',
        [stock.symbol, 'stock', parseFloat(stock.price.replace('R$ ', '')), stock.change, stock.volume, timestamp]
      );
    }
    
    // Salvar dados de criptomoedas
    for (const coin of crypto) {
      await client.query(
        'INSERT INTO financial_data (symbol, type, price, change_percent, volume, timestamp) VALUES ($1, $2, $3, $4, $5, $6)',
        [coin.symbol, 'crypto', parseFloat(coin.price.replace('R$ ', '')), coin.change, coin.volume, timestamp]
      );
    }
    
    // Salvar dados de forex
    for (const pair of forex) {
      await client.query(
        'INSERT INTO financial_data (symbol, type, price, change_percent, volume, timestamp) VALUES ($1, $2, $3, $4, $5, $6)',
        [pair.symbol, 'forex', parseFloat(pair.price.replace('R$ ', '')), pair.change, pair.volume, timestamp]
      );
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao salvar dados de mercado no banco:', error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getMarketData,
  getQuote,
  getHistoricalData,
  searchAssets
};
