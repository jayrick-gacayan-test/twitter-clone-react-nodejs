import axios from "axios";
import authHeader from "./auth_header";
const API_URL = "http://localhost:3001/api/users/";

const getUser = (userId) => {
    return axios.get(API_URL + `${userId}`);
}

const updateProfile = (userId, firstName, lastName) => {
    return axios.put(API_URL + `${ userId }`,
        {
            firstName,
            lastName
        },
        {
            headers : authHeader()
        }
    )
};

const getAllUsers = () => {
    return axios.get(API_URL);
};

const UserService = {
    getUser,
    updateProfile,
    getAllUsers
}

export default UserService;