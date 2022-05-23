import axios from "axios";
import authHeader from "./auth_header";
const API_URL = "http://localhost:3001/api/tweets/";


const createTweet = (userId, title, content) => {
    return axios.post(API_URL + "create",
        {
            title,
            content,
            userId
        },
        {
            headers : authHeader()
        });
}

const getUserTweets = (userId) => {
    return axios.get(API_URL + `?userId=${ userId }`);
}

const TweetService = {
    createTweet,
    getUserTweets
}

export default TweetService;