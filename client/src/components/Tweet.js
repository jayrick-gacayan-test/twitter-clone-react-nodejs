import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import DummyImage from './layouts/DummyImage';

/* services */
import TweetService from '../services/tweet_service';
import AuthService from '../services/auth_service';

const Tweet = () => {
    const { id } = AuthService.getCurrentUser();
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

    const deleteTweet = (tweetId) => {
        
    }


    const tweetDate = !tweet ? null: new Date(tweet.createdAt);

    return (
        <React.Fragment>
            <div className="container-fluid row">
                <LeftSideContent />
                <main className="col-lg-6 g-0 border border-top-0 border-bottom-0">
                    <div className="container-fluid py-2 px-3">
                        <h4>Tweet</h4>
                    </div>
                    <hr className="m-0"/>
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
                            <div className="container-fluid py-2 px-3 d-flex">
                                <div className="me-2">
                                    <DummyImage 
                                        className="bg-light text-dark"
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            maxWidth: "60px",
                                            maxHeight: "60px",
                                        }}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex">
                                        
                                        <span className="me-1">name</span>
                                        <span className="me-1"></span>
                                        <span className="me-1">
                                            { tweetDate.toLocaleString("default", { month: "short" }) }
                                            {" "}
                                            { tweetDate.getDate() }{" "}
                                            { new Date().getFullYear() !== tweetDate.getFullYear() &&
                                                tweetDate.getFullYear() }
                                        </span>
                                        {
                                            id === tweet.userId && 
                                            (
                                                <span id="tweetActionDropdown" 
                                                    className="ms-auto dropdown dropstart">
                                                    <div className="dropdown-toggle" data-bs-toggle="dropdown">
                                                        <i className="bi bi-three-dots-vertical"></i>
                                                    </div>
                                                    <ul className="dropdown-menu">
                                                        <li className="dropdown-item">Delete</li>
                                                        <li className="dropdown-item">Update</li>
                                                    </ul>
                                                </span>
                                            )
                                        }
                                        
                                    </div>
                                    <div>
                                        <p className="font-weight-bold h4">{ tweet.title }</p>
                                        <p>{ tweet.content }</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    width="16" 
                                                    height="16" 
                                                    fill="currentColor" 
                                                    className="bi bi-heart" 
                                                    viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                    
                    <hr className="m-0" />
                    
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}

export default Tweet;