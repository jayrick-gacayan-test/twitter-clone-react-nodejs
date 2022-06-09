import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TopMostContent from './layouts/TopMostContent';
import TweetItem from './Tweet/TweetItem';

/* services */
import TweetService from '../services/tweet_service';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';
import { sidebarResponsive } from '../utilities/sidebar_navigation_utility';

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

            const { innerWidth } = getScreenDimension();
        
            sidebarResponsive({ innerWidth });
            
            function handleResize(){
                const { innerWidth } = getScreenDimension();
                sidebarResponsive({ innerWidth });
            }
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
        ,[ tweetId ]
    );

    /* const deleteTweet = (tweetId) => {
        
    } */


    //const tweetDate = !tweet ? null: new Date(tweet.createdAt);
    console.log("TweetInfo ==== ", tweetInfo);
    return (
        <React.Fragment>
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">z
                    <TopMostContent title="Tweet" />
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