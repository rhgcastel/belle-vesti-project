import axios from 'axios';

const api = axios.create({
    baseURL: 'https://belle-vesti-server-eni7ag6q3-rodrigocastel.vercel.app'
})

export default api;