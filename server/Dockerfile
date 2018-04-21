FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "process.yml", "./"]
RUN npm install pm2 -g && npm install --production --silent && mv node_modules ../
COPY . .
CMD ["pm2-runtime", "process.yml", "--env", "production", "--no-daemon" ]
