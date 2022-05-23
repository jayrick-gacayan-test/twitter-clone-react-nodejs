import axios from "axios";
import authHeader from "./auth_header";
const API_URL = "http://localhost:3001/api/users/";

const getUser = (userId) => {
    return axios.get(API_URL + `${userId}`);
}

const updateProfile = (firstName, lastName) => {
    
};

const UserService = {
    getUser
}

export default UserService;