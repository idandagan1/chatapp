const dev = {
    endpoint: 'http://localhost:8080'
};
  
const prod = {
    endpoint: `http://${process.env.ENDPOINT}:${process.env.PORT}`
};

const config = process.env.NODE_ENV === 'production'
    ? prod
    : dev;

export default {
    ...config
};
