
const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
  // Se estivermos em ambiente de desenvolvimento, podemos permitir acesso sem token
  if (process.env.NODE_ENV === 'development' && process.env.BYPASS_AUTH === 'true') {
    console.log('Autenticação ignorada em ambiente de desenvolvimento');
    req.user = { id: 1, email: 'dev@example.com', role: 'admin' };
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
};
