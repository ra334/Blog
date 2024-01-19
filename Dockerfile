FROM node
WORKDIR /app
EXPOSE 8080

COPY Server/build /app

RUN npm run production
CMD ["npm", "run", "node:start:migrate:prod"]