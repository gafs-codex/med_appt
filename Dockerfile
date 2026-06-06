# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: Backend server
FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --production

COPY server/ ./server/

# copy build output
COPY --from=frontend-builder /app/server/build ./server/public
EXPOSE 8181

CMD ["node", "server/index.js"]