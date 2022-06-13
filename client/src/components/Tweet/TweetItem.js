import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* services */ 
import AuthService from "../../services/auth_service";
import TweetService from "../../services/tweet_service";

/* utilities and helpers */
import ModalUtility from "../../utilities/modal_utility";
const fileImageBaseUrl = "http://localhost:3001/files";

const TweetItem = (props) => {
    let navigate = useNavigate();
    const { tweet } = props;
    
    const tweetDate = new Date(tweet.createdAt);
    
    const tweetFirstName = tweet.user.firstName || "";
    const tweetLastName = tweet.user.lastName || "";  
    const tweetName = `${ tweetFirstName } ${ tweetLastName }`;
    
    const [tweetLikes, setTweetLikes] = useState(tweet.likes);
   
    const [liked, setLiked] = useState(
        !AuthService.getCurrentUser() ? false : 
        ((tweetLikes.filter(
                        (like) => 
                        {
                            return AuthService.getCurrentUser() && 
                                (like.userId === AuthService.getCurrentUser().id); 
                        }
                    ))
                .length > 0 ? true: false)
    );
    
    const [likesCount, setLikesCount] = useState(
                        (tweetLikes.filter((like) => { return like.isLiked; })).length
                    );
    
    const openDeleteTweetModal = () => {
        const modalDeleteTweet = document.getElementById('modalDeleteTweet');
        ModalUtility.showModal(modalDeleteTweet);
    }

    const handleLikeTweet = (tweetId) => {

        if(!AuthService.getCurrentUser())
        {    
            alert("You must login first.");
            return;
        }    
        
        TweetService.likeTweet(tweetId, AuthService.getCurrentUser().id)
            .then(
                (response) => {
                    console.log("Data ---- ", response.data);
                    
                    const likeTweetByUser = tweetLikes.filter(
                        (like) => { 
                            return like.userId === AuthService.getCurrentUser().id; 
                        }
                    );

                    setTweetLikes(
                        (likeTweetByUser.length < 1) ?
                        [ ...tweetLikes, response.data ] :
                        tweetLikes.map(
                            (like) => {
                                if(like.userId === AuthService.getCurrentUser().id)
                                    return { ...like, isLiked: response.data.isLiked }

                                return like;
                            }
                        )
                    );

                    setLiked(response.data.isLiked);
                    setLikesCount(
                        (likesCount) => {
                            return liked ? likesCount - 1 : likesCount + 1;
                        }
                    );
                },
                (error) => {
                    const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                            error.message ||
                            error.toString() || error;

                    alert(resMessage);
                }
            );
    }

    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="ms-3">
                    <img src={ `${ fileImageBaseUrl }/profile/${ tweet.user.userImage }`}
                        alt={ `${ tweetFirstName }-pic` }
                        className="rounded-circle d-inline-block"
                        style={{
                            width: "60px",
                            height: "60px",
                            maxWidth: "60px",
                            maxHeight: "60px",
                        }}/>                   
                </div>
                <div className="flex-grow-1 px-3">
                    <div
                        className="d-block text-decoration-none text-dark"
                        style={{
                            cursor: "pointer"
                        }}>
                        <div className="d-flex justify-content-between">
                            <div onClick={
                                () => {
                                    navigate(`/profile/${ tweet.userId }`);
                                }
                            }>
                                <span className="me-1">{ tweetName }</span>
                                <span className="me-1">@{ tweet.user.email }</span>
                                <span className="me-1">
                                    { tweetDate.toLocaleString("default", { month: "short" }) }
                                    { " " }
                                    { tweetDate.getDate() }
                                    { " " }
                                    { new Date().getFullYear() !== tweetDate.getFullYear() &&
                                        tweetDate.getFullYear() }
                                </span>
                            </div>
                            {
                                ( AuthService.getCurrentUser() &&
                                tweet.userId === AuthService.getCurrentUser().id) &&
                                (
                                    <div>
                                        <div className="dropdown">
                                            <button className="btn btn-sm btn-link text-dark dropdown-toggle" 
                                                    type="button" 
                                                    id="dropdownMenu2" 
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-lg-start" 
                                                aria-labelledby="dropdownMenu2">
                                                <li>
                                                    <button className="dropdown-item" 
                                                            type="button"
                                                            onClick={ openDeleteTweetModal }>Delete tweet</button>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" 
                                                            type="button"
                                                            onClick={ 
                                                                () => {
                                                                    navigate(`/tweets/${ tweet.id }/edit`);
                                                                } 
                                                            }>Update tweet</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                        <div onClick={
                                    () => {
                                        navigate(`/tweets/${ tweet.id }`);
                                    }
                                }>
                            <p>{ tweet.content }</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div >
                            <span>
                                <i className={ `me-1 bi bi-hand-thumbs-up${ liked ? `-fill text-info` : ``}`}
                                    onClick={ () => handleLikeTweet(tweet.id) }></i>
                                {
                                    likesCount > 0 &&
                                    <span>{ likesCount }</span>
                                }
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </React.Fragment>
    )
}

export default TweetItem;