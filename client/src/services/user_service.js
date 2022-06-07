import axios from "axios";
import authHeader from "./auth_header";
const API_URL = "http://localhost:3001/api/users/";

const getUser = (userId) => {
    return axios.get(API_URL + `${userId}`);
}

const updateProfile = (userId, firstName, lastName, userImage) => {
    
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('userImage', userImage);
    
    return axios.put(API_URL + `${ userId }`,
        formData,
        {
            headers : { 
                        ...authHeader(), 
                        'Content-Type' : 'multipart/form-data' 
                    }
        }
    );
};

const getAllUsers = () => {
    return axios.get(API_URL);
};

const getAllUsersByEmail = (email) => {
    return axios.get(API_URL + `?email=${ email }`);
}

const UserService = {
    getUser,
    updateProfile,
    getAllUsers,
    getAllUsersByEmail
}

export default UserService;