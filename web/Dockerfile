FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY public public
COPY src src
RUN npm run build
#&& npm install -g serve
EXPOSE 3000
#CMD serve -s build
CMD ["npm", "start"]