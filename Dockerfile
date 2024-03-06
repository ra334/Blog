FROM node
WORKDIR /app
EXPOSE 5050

COPY Server/build /app
COPY Server/prisma /app
COPY Client/robots.txt /app

RUN cp .env.production .env
RUN npm run production
CMD ["sh", "-c", "sleep 5 && npm run start:migrate:prod"]