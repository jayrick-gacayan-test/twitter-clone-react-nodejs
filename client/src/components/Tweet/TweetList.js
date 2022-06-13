import React from "react";

import TweetItem from "./TweetItem";

const TweetList = (props) => {
    const { tweets } = props;
    return (
        tweets.length > 0 &&
        tweets.map(
            (tweet) => {
                return (
                    <TweetItem key={ tweet.id }
                            tweet={ tweet } />
                )
            }
        )
    );
};

export default TweetList;