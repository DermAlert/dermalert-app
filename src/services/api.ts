import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_KEY}/api/v1`,
  timeout: 10000
});

// Retry simples
api.interceptors.response.use(null, async (error) => {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    //console.log('Tentando novamente...');
    return api.request(error.config);
  }
  return Promise.reject(error);
});


export { api };

