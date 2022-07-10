import axios from 'axios';
import authHeader from './auth_header';
const API_URL = "http://localhost:3001/api/user/"

const register = (email, password, cfpswd) => {
    return axios.post(API_URL + 'register',
        {
            email,
            password,
            cfpswd
        }
    );
}

const login = (email, password) => {
    return axios.post(API_URL + "login", {
      email,
      password,
    })
    .then(
        (response) => {
            const { id, accessToken } = response.data;
            if (response.data.accessToken)
                localStorage.setItem("user",
                        JSON.stringify({ id, accessToken }));
            
            return response.data;
        }
    );
};

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const getAuthUser = (userId) => {
    return axios.get(API_URL + `${ userId }/auth`,
                    {
                        headers: authHeader()
                    });
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    getAuthUser
};

export default AuthService;

