import React, { useEffect, useState } from 'react';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';

/* Services */
import AuthService from '../services/auth_service';
import TweetService from '../services/tweet_service';
import TweetList from './Tweet/TweetList';

const Explore = () => {
    //const { id, email, firstName, lastName } = AuthService.getCurrentUser();

    const [tweets, setTweets] = useState([]);

    useEffect(
        () => {
            fetchTweets();
        }
        ,[]
    );

    const fetchTweets = () => {
        TweetService.getTweets()
            .then(
                (response) => {
                    if(response.data){
                        const tweetsList = response.data;
                        
                        if(AuthService.getCurrentUser())
                            setTweets(tweetsList.filter(
                                (tweet) => { return AuthService.getCurrentUser().id !== tweet.User.id }
                            ));
                        else
                        setTweets(tweetsList);
                    }
                },
                (error) => {
                    console.log("Error ---- ", error);
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
                        <h4>Explore</h4>
                    </div>
                    <hr className="m-0"/>
                    <div className="container-fluid g-0 mt-3">
                        {
                            tweets.length > 0 &&
                            <TweetList tweets={ tweets }
                                handleLlkeTweet={ handleLikeTweet }/>
                        }
                    </div>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    )
}

export default Explore;