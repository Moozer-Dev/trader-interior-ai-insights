
const NodeCache = require('node-cache');
const config = require('../config');

// Cache com tempo de vida padrão de 5 minutos (300 segundos)
const cache = new NodeCache({ stdTTL: config.defaultCacheTime });

function cacheMiddleware(ttl = config.defaultCacheTime) {
  return (req, res, next) => {
    // Criar uma chave única baseada na rota e parâmetros
    const key = req.originalUrl || req.url;
    
    // Verificar se a resposta já está em cache
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      // Enviar resposta do cache
      return res.json(cachedResponse);
    }
    
    // Método original para enviar resposta
    const originalSend = res.json;
    
    // Sobrescrever o método json para adicionar a resposta ao cache
    res.json = function(body) {
      // Adicionar ao cache apenas se a resposta for bem-sucedida
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, body, ttl);
      }
      
      // Chamar o método original
      return originalSend.call(this, body);
    };
    
    next();
  };
}

module.exports = cacheMiddleware;
