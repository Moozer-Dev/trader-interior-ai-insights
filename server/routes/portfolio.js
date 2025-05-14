
const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolioService');

// Obter o portfólio completo do usuário
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const portfolio = await portfolioService.getUserPortfolio(userId);
    res.json(portfolio);
  } catch (error) {
    console.error('Erro ao obter portfólio:', error);
    res.status(500).json({ message: 'Erro ao obter dados do portfólio' });
  }
});

// Adicionar ativo ao portfólio
router.post('/asset', async (req, res) => {
  try {
    const userId = req.user.id;
    const { symbol, quantity, price, date } = req.body;
    
    const result = await portfolioService.addAsset(userId, symbol, quantity, price, date);
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao adicionar ativo:', error);
    res.status(500).json({ message: 'Erro ao adicionar ativo ao portfólio' });
  }
});

// Atualizar ativo do portfólio
router.put('/asset/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const assetId = req.params.id;
    const { quantity, price } = req.body;
    
    const result = await portfolioService.updateAsset(userId, assetId, quantity, price);
    res.json(result);
  } catch (error) {
    console.error('Erro ao atualizar ativo:', error);
    res.status(500).json({ message: 'Erro ao atualizar ativo no portfólio' });
  }
});

// Remover ativo do portfólio
router.delete('/asset/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const assetId = req.params.id;
    
    await portfolioService.removeAsset(userId, assetId);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover ativo:', error);
    res.status(500).json({ message: 'Erro ao remover ativo do portfólio' });
  }
});

// Obter histórico de desempenho
router.get('/performance', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period } = req.query;
    
    const performance = await portfolioService.getPerformance(userId, period);
    res.json(performance);
  } catch (error) {
    console.error('Erro ao obter desempenho:', error);
    res.status(500).json({ message: 'Erro ao obter histórico de desempenho' });
  }
});

module.exports = router;
