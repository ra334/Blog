FROM node
WORKDIR /app
EXPOSE 8080

COPY server/build /app

RUN npm run production
RUN npx prisma generate
CMD ["node", "app.js"]