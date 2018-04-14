FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install pm2 -g && npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8000
CMD pm2-runtime process.yml --no-daemon