
const db = require('../db');

// Listar usuários
async function getUsers() {
  try {
    const { rows } = await db.query(
      `SELECT 
        u.id, u.name, u.email, u.role, u.created_at, 
        s.plan_id, p.name as plan_name, s.status
      FROM users u
      LEFT JOIN subscriptions s ON u.id = s.user_id
      LEFT JOIN plans p ON s.plan_id = p.id
      ORDER BY u.created_at DESC`
    );
    
    return rows;
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    throw error;
  }
}

// Gerenciar planos
async function getPlans() {
  try {
    const { rows } = await db.query(
      `SELECT 
        p.*, 
        COUNT(s.id) as subscriber_count
      FROM plans p
      LEFT JOIN subscriptions s ON p.id = s.plan_id
      GROUP BY p.id
      ORDER BY p.price ASC`
    );
    
    return rows;
  } catch (error) {
    console.error('Erro ao listar planos:', error);
    throw error;
  }
}

// Configurar integrações
async function getIntegrations() {
  try {
    const { rows } = await db.query(
      `SELECT * FROM integrations ORDER BY name ASC`
    );
    
    // Mascarar chaves de API
    const integrationsWithMaskedKeys = rows.map(integration => {
      if (integration.api_key) {
        integration.api_key = maskApiKey(integration.api_key);
      }
      return integration;
    });
    
    return integrationsWithMaskedKeys;
  } catch (error) {
    console.error('Erro ao listar integrações:', error);
    throw error;
  }
}

// Relatórios
async function generateReport(type, startDate, endDate) {
  try {
    let report = [];
    
    switch (type) {
      case 'users':
        report = await generateUsersReport(startDate, endDate);
        break;
      case 'revenue':
        report = await generateRevenueReport(startDate, endDate);
        break;
      case 'usage':
        report = await generateUsageReport(startDate, endDate);
        break;
      default:
        throw new Error('Tipo de relatório inválido');
    }
    
    return report;
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    throw error;
  }
}

// Funções auxiliares
function maskApiKey(apiKey) {
  if (!apiKey || apiKey.length < 8) {
    return '********';
  }
  
  const firstFour = apiKey.substring(0, 4);
  const lastFour = apiKey.substring(apiKey.length - 4);
  
  return `${firstFour}********${lastFour}`;
}

async function generateUsersReport(startDate, endDate) {
  const dateFilter = buildDateFilter('created_at', startDate, endDate);
  
  const { rows } = await db.query(
    `SELECT 
      DATE_TRUNC('day', created_at) as date,
      COUNT(*) as count
    FROM users
    WHERE ${dateFilter}
    GROUP BY DATE_TRUNC('day', created_at)
    ORDER BY date ASC`
  );
  
  return rows;
}

async function generateRevenueReport(startDate, endDate) {
  const dateFilter = buildDateFilter('created_at', startDate, endDate);
  
  const { rows } = await db.query(
    `SELECT 
      DATE_TRUNC('day', p.created_at) as date,
      SUM(p.amount) as total,
      COUNT(*) as transactions
    FROM payments p
    WHERE ${dateFilter}
    GROUP BY DATE_TRUNC('day', p.created_at)
    ORDER BY date ASC`
  );
  
  return rows;
}

async function generateUsageReport(startDate, endDate) {
  const dateFilter = buildDateFilter('timestamp', startDate, endDate);
  
  const { rows } = await db.query(
    `SELECT 
      DATE_TRUNC('day', timestamp) as date,
      COUNT(*) as requests,
      COUNT(DISTINCT user_id) as active_users
    FROM api_requests
    WHERE ${dateFilter}
    GROUP BY DATE_TRUNC('day', timestamp)
    ORDER BY date ASC`
  );
  
  return rows;
}

function buildDateFilter(column, startDate, endDate) {
  let filter = '1=1';
  
  if (startDate && endDate) {
    filter = `${column} BETWEEN '${startDate}' AND '${endDate}'`;
  } else if (startDate) {
    filter = `${column} >= '${startDate}'`;
  } else if (endDate) {
    filter = `${column} <= '${endDate}'`;
  }
  
  return filter;
}

module.exports = {
  getUsers,
  getPlans,
  getIntegrations,
  generateReport
};
