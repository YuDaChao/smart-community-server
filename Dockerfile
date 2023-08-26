FROM node:18-alpine AS builder

LABEL authors="yudachao"

WORKDIR '/app'

COPY ./package*.json .

RUN npm i

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build


FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

EXPOSE 50000

CMD ["node", "dist/src/main"]

