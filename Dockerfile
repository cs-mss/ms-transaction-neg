FROM node:23.3.0

WORKDIR /app

COPY ms-transaction-neg/package*.json ./

RUN npm install

COPY ms-transaction-neg/ ./

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
