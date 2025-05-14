
const db = require('../db');
const marketService = require('./marketService');
const { trainModel, predictWithModel } = require('../utils/aiModels');

// Verificar status dos modelos de IA
async function getModelsStatus() {
  try {
    // Verificar se os modelos estão disponíveis
    const modelsAvailable = await areModelsAvailable();
    
    return {
      aiModelsAvailable: modelsAvailable,
      aiModelStatus: {
        pricePredictor: modelsAvailable,
        portfolioSuggestion: modelsAvailable,
        technicalAnalysis: modelsAvailable,
        patternDetection: false // Ainda não implementado
      }
    };
  } catch (error) {
    console.error('Erro ao verificar status dos modelos:', error);
    return {
      aiModelsAvailable: false,
      aiModelStatus: {
        pricePredictor: false,
        portfolioSuggestion: false,
        technicalAnalysis: false,
        patternDetection: false
      }
    };
  }
}

// Previsão de preços
async function getPricePrediction(symbol, days = 7) {
  try {
    // Obter dados históricos para treinar o modelo
    const historicalData = await marketService.getHistoricalData(symbol, 'daily', '1y');
    
    // Treinar modelo
    const model = await trainModel('price_prediction', historicalData);
    
    // Fazer previsão
    const predictions = await predictWithModel(model, historicalData, parseInt(days));
    
    // Salvar no banco de dados
    await savePrediction(symbol, predictions);
    
    return predictions;
  } catch (error) {
    console.error('Erro na previsão de preços:', error);
    throw error;
  }
}

// Sugestão de portfólio
async function getPortfolioSuggestion(userId, riskLevel, investmentAmount) {
  try {
    // Obter dados de mercado
    const marketData = await marketService.getMarketData();
    
    // Obter preferências do usuário
    const { rows: userPreferences } = await db.query(
      'SELECT * FROM user_preferences WHERE user_id = $1',
      [userId]
    );
    
    const preference = userPreferences.length > 0 ? userPreferences[0] : { risk_tolerance: 'medium' };
    
    // Usar nível de risco fornecido ou o do perfil do usuário
    const finalRiskLevel = riskLevel || preference.risk_tolerance;
    
    // Gerar sugestão de portfólio
    const suggestion = await generatePortfolioSuggestion(marketData, finalRiskLevel, investmentAmount);
    
    // Salvar no banco de dados
    await saveSuggestion(userId, suggestion);
    
    return suggestion;
  } catch (error) {
    console.error('Erro na sugestão de portfólio:', error);
    throw error;
  }
}

// Análise técnica
async function getTechnicalAnalysis(symbol, period = '6m') {
  try {
    // Obter dados históricos
    const historicalData = await marketService.getHistoricalData(symbol, 'daily', period);
    
    // Calcular indicadores técnicos
    const analysis = calculateTechnicalIndicators(historicalData);
    
    // Salvar no banco de dados
    await saveAnalysis(symbol, analysis);
    
    return analysis;
  } catch (error) {
    console.error('Erro na análise técnica:', error);
    throw error;
  }
}

// Funções auxiliares
async function areModelsAvailable() {
  try {
    // Verificar configuração no banco de dados
    const { rows } = await db.query(
      'SELECT value FROM settings WHERE key = $1',
      ['ai_models_enabled']
    );
    
    return rows.length > 0 && rows[0].value === 'true';
  } catch (error) {
    console.error('Erro ao verificar disponibilidade dos modelos de IA:', error);
    return false;
  }
}

async function savePrediction(symbol, predictions) {
  try {
    // Salvar previsão no banco de dados
    await db.query(
      'INSERT INTO ai_analyses (type, symbol, data, created_at) VALUES ($1, $2, $3, NOW())',
      ['price_prediction', symbol, JSON.stringify(predictions)]
    );
  } catch (error) {
    console.error('Erro ao salvar previsão:', error);
  }
}

async function saveSuggestion(userId, suggestion) {
  try {
    // Salvar sugestão no banco de dados
    await db.query(
      'INSERT INTO ai_analyses (type, user_id, data, created_at) VALUES ($1, $2, $3, NOW())',
      ['portfolio_suggestion', userId, JSON.stringify(suggestion)]
    );
  } catch (error) {
    console.error('Erro ao salvar sugestão:', error);
  }
}

async function saveAnalysis(symbol, analysis) {
  try {
    // Salvar análise no banco de dados
    await db.query(
      'INSERT INTO ai_analyses (type, symbol, data, created_at) VALUES ($1, $2, $3, NOW())',
      ['technical_analysis', symbol, JSON.stringify(analysis)]
    );
  } catch (error) {
    console.error('Erro ao salvar análise:', error);
  }
}

function calculateTechnicalIndicators(historicalData) {
  // Implementação simplificada de indicadores técnicos
  const lastPrice = historicalData[historicalData.length - 1].close;
  
  // Calcular média móvel simples de 20 e 50 dias
  const sma20 = calculateSMA(historicalData, 20);
  const sma50 = calculateSMA(historicalData, 50);
  
  // Calcular RSI
  const rsi = calculateRSI(historicalData, 14);
  
  // Calcular MACD
  const macd = calculateMACD(historicalData);
  
  // Determinar tendência
  let trend = 'neutral';
  if (lastPrice > sma20 && sma20 > sma50) {
    trend = 'bullish';
  } else if (lastPrice < sma20 && sma20 < sma50) {
    trend = 'bearish';
  }
  
  // Determinar suporte e resistência
  const support = findSupport(historicalData);
  const resistance = findResistance(historicalData);
  
  return {
    lastPrice,
    indicators: {
      sma20,
      sma50,
      rsi,
      macd
    },
    analysis: {
      trend,
      support,
      resistance,
      recommendation: determineRecommendation(trend, rsi, macd)
    }
  };
}

function calculateSMA(data, period) {
  if (data.length < period) {
    return null;
  }
  
  const prices = data.slice(-period).map(item => item.close);
  const sum = prices.reduce((total, price) => total + price, 0);
  return sum / period;
}

function calculateRSI(data, period) {
  if (data.length < period + 1) {
    return null;
  }
  
  let gains = 0;
  let losses = 0;
  
  for (let i = data.length - period; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    if (change >= 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }
  
  if (losses === 0) {
    return 100;
  }
  
  const relativeStrength = gains / losses;
  return 100 - (100 / (1 + relativeStrength));
}

function calculateMACD(data) {
  const ema12 = calculateEMA(data, 12);
  const ema26 = calculateEMA(data, 26);
  
  if (!ema12 || !ema26) {
    return null;
  }
  
  return ema12 - ema26;
}

function calculateEMA(data, period) {
  if (data.length < period) {
    return null;
  }
  
  const prices = data.map(item => item.close);
  const multiplier = 2 / (period + 1);
  
  let ema = prices.slice(0, period).reduce((total, price) => total + price, 0) / period;
  
  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }
  
  return ema;
}

function findSupport(data) {
  // Implementação simplificada para encontrar suporte
  const prices = data.map(item => item.low);
  const min = Math.min(...prices.slice(-30));
  return min;
}

function findResistance(data) {
  // Implementação simplificada para encontrar resistência
  const prices = data.map(item => item.high);
  const max = Math.max(...prices.slice(-30));
  return max;
}

function determineRecommendation(trend, rsi, macd) {
  // Implementação simplificada de recomendação
  if (trend === 'bullish' && rsi < 70 && macd > 0) {
    return 'compra';
  } else if (trend === 'bearish' && rsi > 30 && macd < 0) {
    return 'venda';
  } else {
    return 'neutro';
  }
}

async function generatePortfolioSuggestion(marketData, riskLevel, investmentAmount) {
  // Implementação simplificada de sugestão de portfólio
  const amount = parseFloat(investmentAmount);
  
  // Diferentes alocações baseadas no nível de risco
  let allocation;
  
  switch (riskLevel) {
    case 'low':
      allocation = {
        stocks: 0.3,
        fixedIncome: 0.6,
        crypto: 0.05,
        cash: 0.05
      };
      break;
    case 'medium':
      allocation = {
        stocks: 0.5,
        fixedIncome: 0.3,
        crypto: 0.15,
        cash: 0.05
      };
      break;
    case 'high':
      allocation = {
        stocks: 0.7,
        fixedIncome: 0.1,
        crypto: 0.15,
        cash: 0.05
      };
      break;
    default:
      allocation = {
        stocks: 0.5,
        fixedIncome: 0.3,
        crypto: 0.15,
        cash: 0.05
      };
  }
  
  // Selecionar ativos com base no desempenho recente
  const recommendedStocks = marketData.stocks
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);
  
  // Calcular valores
  const stocksValue = amount * allocation.stocks;
  const fixedIncomeValue = amount * allocation.fixedIncome;
  const cryptoValue = amount * allocation.crypto;
  const cashValue = amount * allocation.cash;
  
  // Criar sugestão de portfólio
  return {
    riskLevel,
    investmentAmount: amount,
    allocation: {
      stocks: {
        percentage: allocation.stocks * 100,
        value: stocksValue,
        assets: recommendedStocks.map(stock => ({
          symbol: stock.symbol,
          name: stock.name,
          allocation: stocksValue / recommendedStocks.length,
          reason: `Bom desempenho recente com variação de ${stock.change}%`
        }))
      },
      fixedIncome: {
        percentage: allocation.fixedIncome * 100,
        value: fixedIncomeValue,
        suggestion: "Tesouro Direto, CDBs ou Fundos de Renda Fixa"
      },
      crypto: {
        percentage: allocation.crypto * 100,
        value: cryptoValue,
        suggestion: "Bitcoin e Ethereum"
      },
      cash: {
        percentage: allocation.cash * 100,
        value: cashValue,
        suggestion: "Reserva de emergência em conta de alta liquidez"
      }
    },
    expectedReturn: {
      annual: calculateExpectedReturn(riskLevel),
      disclaimer: "Retornos passados não garantem resultados futuros"
    }
  };
}

function calculateExpectedReturn(riskLevel) {
  // Estimativas simplificadas de retorno anual
  switch (riskLevel) {
    case 'low':
      return '6% a 8%';
    case 'medium':
      return '8% a 12%';
    case 'high':
      return '12% a 18%';
    default:
      return '8% a 12%';
  }
}

module.exports = {
  getModelsStatus,
  getPricePrediction,
  getPortfolioSuggestion,
  getTechnicalAnalysis
};
