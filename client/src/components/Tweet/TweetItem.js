import React from "react";
import DummyImage from "../layouts/DummyImage";

const TweetItem = (props) => {
    const { tweet } = props;
    const tweetDate = new Date(tweet.createdAt);
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
                    <div className="d-flex">
                        <span className="me-1">{ tweet.User.firstName } { tweet.User.lastName }</span>
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
                    <div className="d-flex justify-content-between">
                        <div>
                            <span>
                                <i className="bi bi-heart"></i>
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="bi bi-heart"></i>
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="bi bi-heart"></i>
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