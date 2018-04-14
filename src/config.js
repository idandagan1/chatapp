const dev = {
    endpoint: 'http://localhost:8080'
  };
  
  const prod = {
    endpoint: `${process.env.ENDPOINT}:${process.env.PORT}`
  };
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    ...config
  };