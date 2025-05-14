
const express = require('express');
const router = express.Router();
const marketService = require('../services/marketService');
const cacheMiddleware = require('../middleware/cache');

// Rota para obter os dados gerais do mercado
router.get('/data', cacheMiddleware(300), async (req, res) => {
  try {
    const data = await marketService.getMarketData();
    res.json(data);
  } catch (error) {
    console.error('Erro ao obter dados do mercado:', error);
    res.status(500).json({ message: 'Erro ao obter dados do mercado' });
  }
});

// Obter cotação específica
router.get('/quote/:symbol', cacheMiddleware(60), async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const quote = await marketService.getQuote(symbol);
    res.json(quote);
  } catch (error) {
    console.error(`Erro ao obter cotação para ${req.params.symbol}:`, error);
    res.status(500).json({ message: 'Erro ao obter cotação' });
  }
});

// Obter histórico de preços
router.get('/history/:symbol', cacheMiddleware(3600), async (req, res) => {
  try {
    const { symbol } = req.params;
    const { interval, range } = req.query;
    const history = await marketService.getHistoricalData(symbol, interval, range);
    res.json(history);
  } catch (error) {
    console.error('Erro ao obter histórico:', error);
    res.status(500).json({ message: 'Erro ao obter histórico de preços' });
  }
});

// Pesquisar ativos
router.get('/search', async (req, res) => {
  try {
    const { query, type } = req.query;
    const results = await marketService.searchAssets(query, type);
    res.json(results);
  } catch (error) {
    console.error('Erro na pesquisa de ativos:', error);
    res.status(500).json({ message: 'Erro ao pesquisar ativos' });
  }
});

module.exports = router;
