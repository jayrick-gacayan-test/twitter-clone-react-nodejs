import React from "react";
import { Link } from "react-router-dom";

import TweetItem from "./TweetItem";

const TweetList = (props) => {
    const { tweets } = props;
    return (
        tweets.length > 0 &&
        tweets.map(
            (tweet) => {
                return (
                    <Link key={ tweet.id } 
                        to={ `/tweets/${ tweet.id }`}
                        className="text-decoration-none text-dark">
                        <TweetItem tweet={ tweet } />
                    </Link>
                )
            }
        )
    );
};

export default TweetList;