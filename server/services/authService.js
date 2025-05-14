
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

// Registrar usuário
async function registerUser(name, email, password) {
  try {
    // Verificar se o email já existe
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (rows.length > 0) {
      throw { code: '23505', message: 'Email já cadastrado' };
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Inserir usuário no banco
    const { rows: newUser } = await db.query(
      'INSERT INTO users (name, email, password, role, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, name, email, role',
      [name, email, hashedPassword, 'user']
    );
    
    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(newUser[0]);
    
    // Salvar refresh token
    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'7 day\')',
      [newUser[0].id, refreshToken]
    );
    
    return {
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        role: newUser[0].role
      },
      accessToken,
      refreshToken
    };
  } catch (error) {
    console.error('Erro no registro:', error);
    throw error;
  }
}

// Login de usuário
async function loginUser(email, password) {
  try {
    // Buscar usuário pelo email
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const user = rows[0];
    
    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return null;
    }
    
    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(user);
    
    // Salvar refresh token
    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'7 day\')',
      [user.id, refreshToken]
    );
    
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}

// Verificar token
async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Verificar se o usuário existe
    const { rows } = await db.query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.userId]);
    
    if (rows.length === 0) {
      return { valid: false };
    }
    
    return {
      valid: true,
      user: rows[0]
    };
  } catch (error) {
    console.error('Erro na verificação de token:', error);
    return { valid: false };
  }
}

// Renovar token
async function refreshToken(token) {
  try {
    // Verificar se o refresh token existe
    const { rows } = await db.query(
      'SELECT rt.*, u.id, u.name, u.email, u.role FROM refresh_tokens rt ' +
      'JOIN users u ON rt.user_id = u.id ' +
      'WHERE rt.token = $1 AND rt.expires_at > NOW()',
      [token]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    const user = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      role: rows[0].role
    };
    
    // Gerar novos tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    
    // Invalidar token antigo
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
    
    // Salvar novo refresh token
    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'7 day\')',
      [user.id, newRefreshToken]
    );
    
    return {
      user,
      accessToken,
      refreshToken: newRefreshToken
    };
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    throw error;
  }
}

// Função auxiliar para gerar tokens
function generateTokens(user) {
  // Payload para o token
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  
  // Gerar access token
  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
  
  // Gerar refresh token
  const refreshToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '7d'
  });
  
  return { accessToken, refreshToken };
}

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  refreshToken
};
