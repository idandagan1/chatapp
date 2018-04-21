FROM node:8.9-alpine

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 5000

CMD ["npm", "run", "serve"]