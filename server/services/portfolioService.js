
const db = require('../db');
const marketService = require('./marketService');

// Obter o portfólio completo do usuário
async function getUserPortfolio(userId) {
  try {
    // Obter ativos do portfólio do usuário
    const { rows: assets } = await db.query(
      'SELECT * FROM user_assets WHERE user_id = $1',
      [userId]
    );
    
    if (assets.length === 0) {
      return {
        totalValue: 0,
        monthlyChange: 0,
        totalReturn: 0,
        totalReturnPercentage: 0,
        assets: [],
        historicalData: []
      };
    }
    
    // Obter cotações atualizadas
    const portfolioAssets = await Promise.all(
      assets.map(async (asset) => {
        const quote = await marketService.getQuote(asset.symbol);
        
        return {
          symbol: asset.symbol,
          price: parseFloat(quote.price.replace('R$ ', '')),
          change: quote.change,
          quantity: asset.quantity,
          total: parseFloat(quote.price.replace('R$ ', '')) * asset.quantity
        };
      })
    );
    
    // Calcular total do portfólio
    const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.total, 0);
    
    // Obter dados históricos do portfólio
    const { rows: historicalData } = await db.query(
      `SELECT 
        date_trunc('day', timestamp) as date,
        SUM(value) as value
      FROM portfolio_history
      WHERE user_id = $1
      GROUP BY date_trunc('day', timestamp)
      ORDER BY date ASC`,
      [userId]
    );
    
    // Calcular variação mensal e retorno total
    const monthlyChange = await calculateMonthlyChange(userId);
    const { totalReturn, totalReturnPercentage } = await calculateTotalReturn(userId);
    
    // Formatar dados históricos
    const formattedHistoricalData = historicalData.map(item => ({
      date: item.date.toISOString().split('T')[0],
      value: parseFloat(item.value)
    }));
    
    return {
      totalValue,
      monthlyChange,
      totalReturn,
      totalReturnPercentage,
      assets: portfolioAssets,
      historicalData: formattedHistoricalData
    };
  } catch (error) {
    console.error('Erro ao obter portfólio:', error);
    throw error;
  }
}

// Adicionar ativo ao portfólio
async function addAsset(userId, symbol, quantity, price, date) {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Verificar se o usuário já possui o ativo
    const { rows } = await client.query(
      'SELECT id, quantity FROM user_assets WHERE user_id = $1 AND symbol = $2',
      [userId, symbol]
    );
    
    if (rows.length > 0) {
      // Atualizar quantidade
      const newQuantity = rows[0].quantity + quantity;
      
      await client.query(
        'UPDATE user_assets SET quantity = $1, updated_at = NOW() WHERE id = $2',
        [newQuantity, rows[0].id]
      );
    } else {
      // Inserir novo ativo
      await client.query(
        'INSERT INTO user_assets (user_id, symbol, quantity, initial_price, purchase_date) VALUES ($1, $2, $3, $4, $5)',
        [userId, symbol, quantity, price, date || new Date()]
      );
    }
    
    // Registrar transação
    await client.query(
      'INSERT INTO transactions (user_id, symbol, quantity, price, type, date) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId, symbol, quantity, price, 'buy', date || new Date()]
    );
    
    // Atualizar histórico do portfólio
    await updatePortfolioHistory(client, userId);
    
    await client.query('COMMIT');
    
    return { success: true, message: 'Ativo adicionado com sucesso' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao adicionar ativo:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Atualizar ativo do portfólio
async function updateAsset(userId, assetId, quantity, price) {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Verificar se o ativo pertence ao usuário
    const { rows } = await client.query(
      'SELECT symbol, quantity FROM user_assets WHERE id = $1 AND user_id = $2',
      [assetId, userId]
    );
    
    if (rows.length === 0) {
      throw new Error('Ativo não encontrado ou não pertence ao usuário');
    }
    
    const { symbol, quantity: oldQuantity } = rows[0];
    const quantityDifference = quantity - oldQuantity;
    
    if (quantityDifference !== 0) {
      // Atualizar quantidade
      await client.query(
        'UPDATE user_assets SET quantity = $1, updated_at = NOW() WHERE id = $2',
        [quantity, assetId]
      );
      
      // Registrar transação (compra ou venda)
      const transactionType = quantityDifference > 0 ? 'buy' : 'sell';
      
      await client.query(
        'INSERT INTO transactions (user_id, symbol, quantity, price, type, date) VALUES ($1, $2, $3, $4, $5, NOW())',
        [userId, symbol, Math.abs(quantityDifference), price, transactionType]
      );
      
      // Atualizar histórico do portfólio
      await updatePortfolioHistory(client, userId);
    }
    
    await client.query('COMMIT');
    
    return { success: true, message: 'Ativo atualizado com sucesso' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao atualizar ativo:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Remover ativo do portfólio
async function removeAsset(userId, assetId) {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Verificar se o ativo pertence ao usuário
    const { rows } = await client.query(
      'SELECT symbol, quantity, initial_price FROM user_assets WHERE id = $1 AND user_id = $2',
      [assetId, userId]
    );
    
    if (rows.length === 0) {
      throw new Error('Ativo não encontrado ou não pertence ao usuário');
    }
    
    const { symbol, quantity, initial_price } = rows[0];
    
    // Remover ativo
    await client.query(
      'DELETE FROM user_assets WHERE id = $1',
      [assetId]
    );
    
    // Registrar transação de venda
    await client.query(
      'INSERT INTO transactions (user_id, symbol, quantity, price, type, date) VALUES ($1, $2, $3, $4, $5, NOW())',
      [userId, symbol, quantity, initial_price, 'sell']
    );
    
    // Atualizar histórico do portfólio
    await updatePortfolioHistory(client, userId);
    
    await client.query('COMMIT');
    
    return { success: true, message: 'Ativo removido com sucesso' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro ao remover ativo:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Obter histórico de desempenho
async function getPerformance(userId, period = '1y') {
  try {
    let interval, dateFilter;
    
    // Determinar intervalo e filtro de data baseado no período
    switch (period) {
      case '1m':
        interval = "day";
        dateFilter = "timestamp >= NOW() - INTERVAL '1 month'";
        break;
      case '3m':
        interval = "day";
        dateFilter = "timestamp >= NOW() - INTERVAL '3 month'";
        break;
      case '6m':
        interval = "day";
        dateFilter = "timestamp >= NOW() - INTERVAL '6 month'";
        break;
      case '1y':
        interval = "week";
        dateFilter = "timestamp >= NOW() - INTERVAL '1 year'";
        break;
      case 'all':
        interval = "month";
        dateFilter = "1=1";
        break;
      default:
        interval = "day";
        dateFilter = "timestamp >= NOW() - INTERVAL '1 month'";
    }
    
    // Obter dados de desempenho
    const { rows } = await db.query(
      `SELECT 
        date_trunc($1, timestamp) as date,
        SUM(value) as value
      FROM portfolio_history
      WHERE user_id = $2 AND ${dateFilter}
      GROUP BY date_trunc($1, timestamp)
      ORDER BY date ASC`,
      [interval, userId]
    );
    
    // Formatar dados
    const formattedData = rows.map(item => ({
      date: item.date.toISOString().split('T')[0],
      value: parseFloat(item.value)
    }));
    
    return formattedData;
  } catch (error) {
    console.error('Erro ao obter desempenho:', error);
    throw error;
  }
}

// Funções auxiliares
async function updatePortfolioHistory(client, userId) {
  try {
    // Obter todos os ativos do usuário
    const { rows: assets } = await client.query(
      'SELECT symbol, quantity FROM user_assets WHERE user_id = $1',
      [userId]
    );
    
    if (assets.length === 0) {
      return;
    }
    
    // Obter cotações atualizadas
    const assetValues = await Promise.all(
      assets.map(async (asset) => {
        try {
          const quote = await marketService.getQuote(asset.symbol);
          const price = parseFloat(quote.price.replace('R$ ', ''));
          return price * asset.quantity;
        } catch (error) {
          console.error(`Erro ao obter cotação para ${asset.symbol}:`, error);
          return 0;
        }
      })
    );
    
    // Calcular valor total
    const totalValue = assetValues.reduce((sum, value) => sum + value, 0);
    
    // Registrar no histórico
    await client.query(
      'INSERT INTO portfolio_history (user_id, value, timestamp) VALUES ($1, $2, NOW())',
      [userId, totalValue]
    );
  } catch (error) {
    console.error('Erro ao atualizar histórico do portfólio:', error);
    throw error;
  }
}

async function calculateMonthlyChange(userId) {
  try {
    // Obter valor do portfólio há um mês atrás
    const { rows: lastMonth } = await db.query(
      `SELECT value
       FROM portfolio_history
       WHERE user_id = $1 AND timestamp <= NOW() - INTERVAL '1 month'
       ORDER BY timestamp DESC
       LIMIT 1`,
      [userId]
    );
    
    // Obter valor atual
    const { rows: current } = await db.query(
      `SELECT value
       FROM portfolio_history
       WHERE user_id = $1
       ORDER BY timestamp DESC
       LIMIT 1`,
      [userId]
    );
    
    if (lastMonth.length === 0 || current.length === 0) {
      return 0;
    }
    
    const lastMonthValue = parseFloat(lastMonth[0].value);
    const currentValue = parseFloat(current[0].value);
    
    if (lastMonthValue === 0) {
      return 0;
    }
    
    return ((currentValue - lastMonthValue) / lastMonthValue) * 100;
  } catch (error) {
    console.error('Erro ao calcular variação mensal:', error);
    return 0;
  }
}

async function calculateTotalReturn(userId) {
  try {
    // Obter valor inicial do portfólio
    const { rows: initial } = await db.query(
      `SELECT value
       FROM portfolio_history
       WHERE user_id = $1
       ORDER BY timestamp ASC
       LIMIT 1`,
      [userId]
    );
    
    // Obter valor atual
    const { rows: current } = await db.query(
      `SELECT value
       FROM portfolio_history
       WHERE user_id = $1
       ORDER BY timestamp DESC
       LIMIT 1`,
      [userId]
    );
    
    if (initial.length === 0 || current.length === 0) {
      return { totalReturn: 0, totalReturnPercentage: 0 };
    }
    
    const initialValue = parseFloat(initial[0].value);
    const currentValue = parseFloat(current[0].value);
    
    const totalReturn = currentValue - initialValue;
    
    let totalReturnPercentage = 0;
    if (initialValue > 0) {
      totalReturnPercentage = (totalReturn / initialValue) * 100;
    }
    
    return { totalReturn, totalReturnPercentage };
  } catch (error) {
    console.error('Erro ao calcular retorno total:', error);
    return { totalReturn: 0, totalReturnPercentage: 0 };
  }
}

module.exports = {
  getUserPortfolio,
  addAsset,
  updateAsset,
  removeAsset,
  getPerformance
};
