FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV production

COPY ./package*.json ./
COPY ./apps/api ./apps/api
COPY ./apps/web/build ./web

RUN npm ci --only=production


EXPOSE 3001
ENV PORT 3001

CMD ["node", "apps/api/dist/main.js"]

