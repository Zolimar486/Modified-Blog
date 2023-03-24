import axios from 'axios'

const BASE_URL= 'https://api-blog-2c7d.onrender.com/api'

export const publicRequest = axios.create({
    baseURL:  BASE_URL,
})