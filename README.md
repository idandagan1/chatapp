# Chat App
Simple chat app using docker-compose, pm2, socket-io, node.js and react

### Clone
1. clone the repo `git clone https://github.com/idandagan1/chatapp.git`
2. `npm i`
3. `npm start`
4. open another terminal and run `npm run server`
5. go to `http://localhost:3000`

### Tests
+ `npm test`
+ `npm run coverage`

### Development
#### Build client:
inside client folder run:
+ `npm i`
+ `npm start`
    + Client starts webpack on port 3000
#### Build server:
inside server folder run:
+ `npm i`
+ open another terminal and run
+ `npm run start:dev`
    + Server listening on port 8080

### Production
* Run:
+ `docker-compose up`
