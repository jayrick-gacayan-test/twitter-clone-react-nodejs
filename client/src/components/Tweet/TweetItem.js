import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../layouts/Avatar";
import CommentList from "../Comment/CommentList";

/* services */ 
import AuthService from "../../services/auth_service";
import TweetService from "../../services/tweet_service";

import { AuthContext } from "../../contexts/auth_context";

/* utilities and helpers */
import ModalUtility from "../../utilities/modal_utility";
import { TimePassed } from "../../utilities/date_utility";

const fileImageBaseUrl = "http://localhost:3001/files";

const TweetItem = (props) => {
    let navigate = useNavigate();
    const { tweet } = props;
    
    const { authUser } = useContext(AuthContext);
    
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
    
    const [ commentText, setCommentText ] = useState("");
    const [tweetComments, setTweetComments] = useState(tweet.comments);
    const [commentsCount, setCommentsCount] = useState(tweetComments.length);
    
    const openDeleteTweetModal = () => {
        const modalDeleteTweet = document.getElementById('modalDeleteTweet');
        ModalUtility.showModal(modalDeleteTweet);
    }

    const handleInputCommentChange = (event) => {
        const { value } = event.target;

        setCommentText(value);
    }

    const handleInputCommentKeyDown = (event) => {
        
        if(event.key === "Enter")
        {
            if(commentText === "") return;

            TweetService.commentTweet(commentText, tweet.id, authUser.id)
                .then(
                    (response) => {
                        console.log("Response data --- ", response.data);

                        setTweetComments([ ...tweetComments, {
                            ...response.data, commenter: authUser
                        }]);

                        setCommentsCount(tweetComments);

                        setCommentText("");
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
            <div className="d-flex mb-2">
                <Avatar divClassName={ `ms-3` }
                        imgSrc={ `${ fileImageBaseUrl }/profile/${ tweet.user.userImage }` }
                        imgAlt={ `${ tweetFirstName }-pic` }
                        imgAvatarSize="avatar-img-size-1"  />
                <div className="flex-grow-1 px-3">
                    <div
                        className="d-block text-decoration-none text-dark bg-secondary opacity-75 text-white rounded-3 py-1 px-3"
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
                                
                                <TimePassed date={ tweet.createdAt } 
                                            spanClassName="me-1"/>
                                <span className="me-1 d-block">@{ tweet.user.email }</span>
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
                    
                </div>
            </div>
            <div className="d-flex justify-content-evenly mb-2 px-2">
                <div>
                    <span>
                        <i className={ `me-1 bi bi-hand-thumbs-up${ liked ? `-fill text-info` : ``}`}
                            onClick={ () => handleLikeTweet(tweet.id) }></i>
                        { likesCount > 0 && <span>{ likesCount }</span> }
                    </span>
                </div>
                <div>
                    <span>
                        <i className="me-1 bi bi-chat-dots"
                            data-bs-toggle="collapse" 
                            data-bs-target={ `#collapseTweetId${ tweet.id }` }
                            aria-expanded="false" 
                            aria-controls={ `collapseTweetId${ tweet.id }` }></i>
                        { commentsCount > 0 && <span>{ commentsCount }</span> }
                    </span>
                </div>
            </div>
            <div id={ `collapseTweetId${ tweet.id }` } className="collapse flex-column align-items-stretch">
                    <div className="d-flex px-3 mb-2 border-bottom border-top py-1">Comments</div>
                    <div className="d-flex px-3 mb-2 border-bottom">
                        {
                            authUser && 
                            (
                                <Avatar divClassName={ `me-3 mt-2` }
                                    imgSrc={ `${ fileImageBaseUrl }/profile/${ authUser.userImage }` }
                                    imgAlt={ `${ authUser.firstName }-pic` }
                                    imgAvatarSize="avatar-img-size-1"  />
                            )
                        }
                        <div className="d-flex flex-column mb-2 mt-2 flex-grow-1 align-items-stretch">
                            {
                                authUser &&
                                (
                                    <div className="mb-1">
                                        <span className="d-block fs-6 fw-normal text-dark">{ authUser.firstName } { authUser.lastName }</span>
                                    </div>
                                )
                            }
                            <div className="mb-1">
                                <input type="text" 
                                    className={ `form-control rounded-pill` } 
                                    id="comment" 
                                    placeholder="Leave a comment to the tweet." 
                                    name="text"
                                    value={ commentText }
                                    onChange={ handleInputCommentChange }
                                    onKeyDown={ handleInputCommentKeyDown }/>
                            </div>
                        </div>
                    </div>
                    {
                        tweetComments.length > 0 &&
                        <CommentList comments={ tweetComments } />
                    }
            </div>
            <hr 
                style={{
                height: "0.5rem"
            }}/>
        </React.Fragment>
    )
}

export default TweetItem;