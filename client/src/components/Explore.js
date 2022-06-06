import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TweetList from './Tweet/TweetList';
import UserList from './User/UserList';

/* Services */
import AuthService from '../services/auth_service';
import TweetService from '../services/tweet_service';
import UserService from '../services/user_service';

const Explore = () => {
    //const { id, email, firstName, lastName } = AuthService.getCurrentUser();
    
    const [containerData, setContainerData] = useState([]);
    const [searchParams] = useSearchParams();

    const query = searchParams.get("email");

    useEffect(
        () => {
            
            if(!query)
                fetchTweets();
            else
                fetchUsersByEmail(query);

            console.log("query ---- ", query);
        }
        ,[query]
    );

    const fetchTweets = () => {
        TweetService.getTweets()
            .then(
                (response) => {
                    if(response.data){
                        const tweetsList = response.data;
                        
                        if(AuthService.getCurrentUser())
                            setContainerData(tweetsList.filter(
                                (tweet) => { return AuthService.getCurrentUser().id !== tweet.User.id }
                            ));
                        else setContainerData(tweetsList);
                    }
                },
                (error) => {
                    console.log("Error ---- ", error);
                }
            );
    }


    const fetchUsersByEmail = (query) => {
        UserService.getAllUsersByEmail(query)
                .then(
                    (response) => {
                        const usersList = response.data;

                        setContainerData(usersList);
                    },
                    (error) => {
                        console.log("Error ==== ", error);
                    }
                );
    }
    const handleLikeTweet = (element) => {
        
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
                            containerData.length > 0 &&
                            (
                                
                                !query ?
                                (<TweetList tweets={ containerData }
                                    handleLlkeTweet={ handleLikeTweet } />) :
                                (<UserList users={ containerData } />)
                            )
                        }
                    </div>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    )
}

export default Explore;