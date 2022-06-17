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

const getTweet = (id) => {
    return axios.get(API_URL + `${ id }`);
}

const deleteTweet = (id, userId) => {
    return axios.delete(API_URL + `${ id }`,
        {   
            headers: authHeader(),
            data:{
                userId
            }
        });
}

const getTweets = () => {
    return axios.get(API_URL);
}

const updateTweet = (id, title, content, userId) => {
    return axios.put(API_URL + `${ id }`,
        {
            title,
            content,
            userId
        },
        {
            headers: authHeader()
        });
}

const likeTweet = (tweetId, userId) => {

    return axios.patch(API_URL + `${ tweetId }/like`, 
                        {
                            userId
                        },
                        {
                            headers: authHeader()
                        }
                    );
}

const commentTweet = (text, tweetId, userId) => {
    return axios.post(API_URL + `${ tweetId }/comment`,
                        {
                            text,
                            userId
                        },
                        {
                            headers : authHeader()
                        });
}

const TweetService = {
    createTweet,
    getUserTweets,
    getTweet,
    deleteTweet,
    updateTweet,
    likeTweet,
    commentTweet,
    getTweets
}

export default TweetService;