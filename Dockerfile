FROM node
WORKDIR /app
EXPOSE 8080

COPY Server/build /app

RUN npm run production
CMD ["sh", "-c", "sleep 10 && npm run node:start:migrate:prod"]