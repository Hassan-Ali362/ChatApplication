import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.Mode === 'development' ? 'http://localhost:5000/api' : '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// import.meta.env.Mode is a Vite specific environment variable that indicates the mode in which the application is running. It can be 'development', 'production', or 'test'. In this case, we are checking if the mode is 'development' to set the baseURL for the axios instance accordingly. If it's in development mode, we use the localhost URL, otherwise we use the relative URL for production.