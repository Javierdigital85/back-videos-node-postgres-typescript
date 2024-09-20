#Etapa de contrucción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 8000
CMD ["npm","start"]


# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 8000
# CMD ["npm", "start"]
