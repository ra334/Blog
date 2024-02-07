FROM node
WORKDIR /app
EXPOSE 5050

COPY Server/build /app

RUN npm run production
CMD ["sh", "-c", "sleep 5 && npm run start:migrate:prod"]