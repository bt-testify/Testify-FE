import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://testify-server.gsc229.now.sh',
    headers: {
      Authorization: token
    }
  });
};
