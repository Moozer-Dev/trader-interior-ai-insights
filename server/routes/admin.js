
const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const { isAdmin } = require('../middleware/roles');

// Middleware para verificar se o usuário é administrador
router.use(isAdmin);

// Listar usuários
router.get('/users', async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao obter lista de usuários' });
  }
});

// Gerenciar planos
router.get('/plans', async (req, res) => {
  try {
    const plans = await adminService.getPlans();
    res.json(plans);
  } catch (error) {
    console.error('Erro ao listar planos:', error);
    res.status(500).json({ message: 'Erro ao obter lista de planos' });
  }
});

// Configurar integrações
router.get('/integrations', async (req, res) => {
  try {
    const integrations = await adminService.getIntegrations();
    res.json(integrations);
  } catch (error) {
    console.error('Erro ao listar integrações:', error);
    res.status(500).json({ message: 'Erro ao obter lista de integrações' });
  }
});

// Relatórios
router.get('/reports/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { startDate, endDate } = req.query;
    
    const report = await adminService.generateReport(type, startDate, endDate);
    res.json(report);
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ message: 'Erro ao gerar relatório' });
  }
});

module.exports = router;
