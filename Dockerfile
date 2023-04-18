FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV production

RUN apk update && apk --no-cache add lsblk lm-sensors

COPY ./package*.json ./
COPY ./apps/api ./apps/api
COPY ./apps/web/dist ./web
COPY ./packages ./packages

RUN npm ci --only=production


EXPOSE 3001
ENV PORT 3001

CMD ["node", "apps/api/dist/main.js"]

