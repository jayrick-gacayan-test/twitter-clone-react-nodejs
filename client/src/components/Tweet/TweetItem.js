import React from "react";
import { Link } from "react-router-dom";

const fileImageBaseUrl = "http://localhost:3001/files";

const TweetItem = (props) => {
    const { tweet } = props;
    const tweetDate = new Date(tweet.createdAt);
    
    const tweetFirstName = tweet.user.firstName || "";
    const tweetLastName = tweet.user.lastName || "";  
    const tweetName = `${ tweetFirstName } ${ tweetLastName }`;
    
    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="ms-3">
                    <img src={ `${fileImageBaseUrl}/profile/${tweet.user.userImage}`}
                        alt={`${tweetFirstName}-pic`}
                        className="rounded-circle d-inline-block"
                        style={{
                            width: "60px",
                            height: "60px",
                            maxWidth: "60px",
                            maxHeight: "60px",
                        }}/>                   
                </div>
                <div className="flex-grow-1 px-3">
                    <Link to={ `/tweets/${ tweet.id }` }
                        className="d-block text-decoration-none text-dark">
                        <div className="d-flex">
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
                        <div>
                            <p>{ tweet.content }</p>
                        </div>
                    </Link>
                    <div className="d-flex justify-content-between">
                        <div >
                            <span>
                                <i className="bi bi-hand-thumbs-up text-danger"
                                    onClick={
                                        (event) => {
                                            props.handleLikeTweet(event);
                                        }    
                                    }></i>
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