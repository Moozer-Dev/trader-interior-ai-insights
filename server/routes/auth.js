
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Log para depuração
    console.log('Tentativa de registro:', { name, email });
    
    const result = await authService.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error('Erro no registro:', error);
    if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Log para depuração
    console.log('Tentativa de login:', { email });
    
    const result = await authService.loginUser(email, password);
    
    if (!result) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ valid: false });
    }
    
    const result = await authService.verifyToken(token);
    res.json(result);
  } catch (error) {
    console.error('Erro na verificação de token:', error);
    res.status(500).json({ message: 'Erro ao verificar token' });
  }
});

// Renovar token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token não fornecido' });
    }
    
    const result = await authService.refreshToken(refreshToken);
    
    if (!result) {
      return res.status(403).json({ message: 'Refresh token inválido ou expirado' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    res.status(500).json({ message: 'Erro ao renovar token' });
  }
});

// Rota de teste para fornecer ao cliente informações sobre o backend
router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    databaseConnection: process.env.DATABASE_URL ? 'configurada' : 'não configurada',
    apiIntegrations: {
      alphaVantage: process.env.ALPHA_VANTAGE_API_KEY ? 'configurada' : 'não configurada',
      twelveData: process.env.TWELVE_DATA_API_KEY ? 'configurada' : 'não configurada',
      yahooFinance: process.env.YAHOO_FINANCE_API_KEY ? 'configurada' : 'não configurada',
      finnhub: process.env.FINNHUB_API_KEY ? 'configurada' : 'não configurada',
      metaTrader: process.env.META_TRADER_API_KEY ? 'configurada' : 'não configurada'
    }
  });
});

module.exports = router;
