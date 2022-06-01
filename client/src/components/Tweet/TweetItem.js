import React from "react";
import { Link } from "react-router-dom";
import DummyImage from "../layouts/DummyImage";

const TweetItem = (props) => {
    const { tweet, handleLikeTweet } = props;
    const tweetDate = new Date(tweet.createdAt);
    
    const tweetFirstName = tweet.User.firstName || "";
    const tweetLastName = tweet.User.lastName || "";  
    const tweetName = `${tweetFirstName} ${tweetLastName}`;

    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="ms-3">
                    <DummyImage 
                        className="text-dark"
                        style={{
                            width: "60px",
                            height: "60px",
                            maxWidth: "60px",
                            maxHeight: "60px",
                        }}
                    />
                </div>
                <div className="flex-grow-1 px-3">
                    <Link key={ tweet.id } 
                        to={ `/tweets/${ tweet.id }`}
                        className="d-block text-decoration-none text-dark">
                        <div className="d-flex">
                            <span className="me-1">{ tweetName }</span>
                            <span className="me-1">@{ tweet.User.email }</span>
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