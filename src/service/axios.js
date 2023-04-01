import axios from "axios";


axios.interceptors.request.use(config=>{
    const token=localStorage.getItem('jwt')
    config.headers.Authorization=token ? `Bearer ${token}` : ''
    return config
})

export default axios