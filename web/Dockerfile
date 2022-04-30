FROM node:12-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY public public
COPY src src
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]