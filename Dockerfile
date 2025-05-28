# Use uma imagem base com Node
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência e instale
COPY package*.json ./
RUN npm install

# Copie o restante da aplicação
COPY . .

# Exponha a porta usada pelo Webpack Dev Server
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "run", "start"]
