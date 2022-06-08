import React, { useEffect, useState } from 'react';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TweetList from './Tweet/TweetList';

/* Services */
import AuthService from '../services/auth_service';
import TweetService from '../services/tweet_service';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';

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
            const { innerWidth } = getScreenDimension();
            const sidebarNavigation = document.getElementById("sidebar-navigation");
            fetchUserTweets(id);

            if(innerWidth <= 991){
                sidebarNavigation.classList.add("width-0");
            }
            else{
                sidebarNavigation.classList.remove("width-0");
            }

            function handleResize(){
                const { innerWidth } = getScreenDimension();
                const sidebarNavigation = document.getElementById("sidebar-navigation");
                if(innerWidth <= 991){
                    sidebarNavigation.classList.add("width-0");
                }
                else{
                    sidebarNavigation.classList.remove("width-0");
                }
            }
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
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
                    console.log(error);
                    
                }
            );
    };

    const fetchUserTweets = (id) => {
        TweetService.getUserTweets(id)
            .then(
                (response) => {
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
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">
                    <div className="container-fluid py-2 px-3 clearfix">
                        <span className="fw-bold fs-3">Home</span>
                        <span className="d-lg-none fw-bold fs-3 d-inline-block float-end"
                            onClick={
                                () => {
                                    const sidebarNavigation = document.getElementById("sidebar-navigation");

                                    sidebarNavigation.classList.toggle("d-none");
                                    sidebarNavigation.classList.toggle("width-0");
                                }
                            }>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                className="bi bi-menu-app" 
                                viewBox="0 0 16 16"
                                style={{
                                    width: "120px",
                                    height: "36px"
                                }}>
                                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </span>
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
                        {
                            allTweet.length > 0 && 
                            <TweetList tweets={ allTweet }
                            handleLikeTweet={ handleLikeTweet } />
                        }
                    </div>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}
export default Dashboard;