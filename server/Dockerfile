
FROM node:20-alpine

WORKDIR /app

# Instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código-fonte
COPY . .

# Configura variáveis de ambiente para desenvolvimento
ENV NODE_ENV=development
ENV PORT=3001
ENV JWT_SECRET=chave_jwt_desenvolvimento_segura
ENV JWT_EXPIRES_IN=1d
ENV BYPASS_AUTH=true

# Expõe a porta
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
