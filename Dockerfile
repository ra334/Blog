FROM node
WORKDIR /app
EXPOSE 8080

COPY server/build /app

RUN npm run production
CMD ["npm", "run", "start:migrate:prod"]