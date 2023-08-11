FROM node:18-alpine

LABEL authors="yudachao"

WORKDIR '/app'

COPY ./package.json .

RUN npm i

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 50000

CMD ["node", "dist/src/main"]

