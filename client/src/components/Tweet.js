import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TweetItem from './Tweet/TweetItem';

/* services */
import TweetService from '../services/tweet_service';
const Tweet = () => {
    //const { id } = AuthService.getCurrentUser();
    const { tweetId } = useParams();

    const initialTweetInfo = {
        title: "",
        content: ""
    };

    const [ tweet, setTweet ] = useState({});
    const [ tweetInfo, setTweetInfo ] = useState(initialTweetInfo);
    const [ successful, setSuccessful ] = useState(false);
    const [ errorText, setErrorText ] = useState(null);

    useEffect(
        () => {
            TweetService.getTweet(tweetId)
                .then(
                    (response) => {
                        const { title, content } = response.data;
                        setTweet(response.data);
                        setTweetInfo({ title, content });
                        setSuccessful(true);
                        setErrorText(null);
                    },
                    (error) => {
                        console.log("Error ---- ",error);
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                            error.message ||
                            error.toString() || error;

                        setErrorText(resMessage);
                        setSuccessful(false);
                    }
                );
        }
        ,[ tweetId ]
    );

    /* const deleteTweet = (tweetId) => {
        
    } */


    //const tweetDate = !tweet ? null: new Date(tweet.createdAt);
    console.log("TweetInfo ==== ", tweetInfo);
    return (
        <React.Fragment>
            <div className="container-fluid row">
                <LeftSideContent />
                <main className="col-lg-6 g-0 border border-top-0 border-bottom-0">
                    <div className="container-fluid py-2 px-3">
                        <h4>Home</h4>
                    </div>
                    <hr className="mt-0"/>
                    {
                        errorText &&
                        (
                            <div className="container-fluid py-2 px-3">
                                <div className="alert alert-danger">
                                    { errorText }
                                </div>
                            </div>
                        )
                    }   
                    {   
                        successful &&    
                        (
                            <div className="container-fluid g-0">
                                <TweetItem tweet={ tweet } />
                            </div>
                        )
                    }
                    
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}

export default Tweet;