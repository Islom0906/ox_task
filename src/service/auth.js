import axios from './axios'

const AuthService={
    async postLogin(login,subdomain){
        return  axios.post(`https://${subdomain}.ox-sys.com/security/auth_check`,login)
    }
}

export default AuthService