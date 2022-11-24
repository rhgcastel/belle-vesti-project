import axios from 'axios';

const api = axios.create({
    baseURL: 'https://belle-vesti-server-rxcgmty7f-rodrigocastel.vercel.app'
})

export default api;