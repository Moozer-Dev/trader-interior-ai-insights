
const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');

// Verificar status dos modelos de IA
router.get('/status', async (req, res) => {
  try {
    const status = await analyticsService.getModelsStatus();
    res.json(status);
  } catch (error) {
    console.error('Erro ao verificar status dos modelos:', error);
    res.status(500).json({ message: 'Erro ao verificar status dos modelos de IA' });
  }
});

// Previsão de preços
router.get('/price-prediction/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { days } = req.query;
    
    const prediction = await analyticsService.getPricePrediction(symbol, days);
    res.json(prediction);
  } catch (error) {
    console.error('Erro na previsão de preços:', error);
    res.status(500).json({ message: 'Erro ao gerar previsão de preços' });
  }
});

// Sugestão de portfólio
router.post('/portfolio-suggestion', async (req, res) => {
  try {
    const userId = req.user.id;
    const { riskLevel, investmentAmount } = req.body;
    
    const suggestion = await analyticsService.getPortfolioSuggestion(userId, riskLevel, investmentAmount);
    res.json(suggestion);
  } catch (error) {
    console.error('Erro na sugestão de portfólio:', error);
    res.status(500).json({ message: 'Erro ao gerar sugestão de portfólio' });
  }
});

// Análise técnica
router.get('/technical-analysis/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period } = req.query;
    
    const analysis = await analyticsService.getTechnicalAnalysis(symbol, period);
    res.json(analysis);
  } catch (error) {
    console.error('Erro na análise técnica:', error);
    res.status(500).json({ message: 'Erro ao gerar análise técnica' });
  }
});

module.exports = router;
