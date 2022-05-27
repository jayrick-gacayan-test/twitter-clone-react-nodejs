import React, { useEffect, useState } from 'react';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TweetList from './Tweet/TweetList';

/* Services */
import AuthService from '../services/auth_service';
import TweetService from '../services/tweet_service';

const Dashboard = () => {
    const { id, email, firstName, lastName } = AuthService.getCurrentUser();
    
    const initialTweet = {
            userId: id,
            title: "",
            content: ""
        }
    
    const [tweet, setTweet] = useState(initialTweet);
    const [allTweet, setAllTweet] = useState([]);
    const user = {
        User : {
            email, 
            firstName, 
            lastName
        }
    };

    useEffect(
        () => {
            fetchUserTweets(id);

            
        }, []
    );
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTweet({ ...tweet, [name]: value });
    }
    
    const handleTweetSubmit = (event) => {
        event.preventDefault();
        const { userId, title, content } = tweet;

        if(!title.trim() || !content.trim() ) {
            console.log("Title and content are required.");
            alert("Title and or content is or are required.");
            return;
        }

        TweetService.createTweet(userId, title, content)
            .then(
                (response) => {
                    const tweetData = { ...response.data, ...user };
                    setAllTweet([...allTweet, tweetData]);
                    setTweet(initialTweet);
                },
                (error) => {
                    console.log("Error ---- ",error);
                    
                }
            );
    };

    const fetchUserTweets = (id) => {
        TweetService.getUserTweets(id)
            .then(
                (response) => {
                    console.log("Tweet --- ", response.data);
                    setAllTweet(response.data);
                },
                (error) => {
                    console.log("Error ---- ",error);
                    
                }
            );
    }

    
    const handleLikeTweet = (element) => {
        console.log("This ---- ", element);
        
        const checkClassName = element.target.classList.contains("bi-heart-fill");

        if(checkClassName)
        {
            element.target.classList.remove("text-danger", "bi-heart-fill");
            element.target.classList.add("bi-heart");
        }
        else{
            element.target.classList.remove("bi-heart");
            element.target.classList.add("text-danger", "bi-heart-fill");
        }
    }

    return (
        <React.Fragment>
            <div className="container-fluid row">
                <LeftSideContent />
                <main className="col-lg-6 g-0 border border-top-0 border-bottom-0">
                    <div className="container-fluid py-2 px-3">
                        <h4>Home</h4>
                    </div>
                    <hr className="m-0"/>
                    <div className="container-fluid py-2 px-3 mb-3">
                        <form onSubmit={ handleTweetSubmit }>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" 
                                    className="form-control" 
                                    id="title" 
                                    placeholder="Enter title" 
                                    name="title"
                                    value={ tweet.title }
                                    onChange={ handleInputChange } />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="form-group">
                            
                                <textarea className="form-control mb-3"
                                        style={{
                                            maxHeight: "150px",
                                            height: "150px",
                                            resize: "none"
                                        }}
                                        placeholder="What's happening?"
                                        name="content"
                                        value={ tweet.content }
                                        onChange={ handleInputChange }>
                                </textarea>
                            </div>
                            <div className="d-block w-100 clearfix">
                                <button type="submit" 
                                    className="btn btn-info text-white rounded-pill float-end">Tweet</button>
                            </div>
                        </form>
                    </div>
                    <hr />
                    <div className="container-fluid g-0">
                        <TweetList tweets={ allTweet }
                            handleLikeTweet={ handleLikeTweet } />
                    </div>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}
export default Dashboard;