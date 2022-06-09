import React, { useState, useEffect } from 'react';

import TopMostContent from '../layouts/TopMostContent';

const EditTweet = (props) => {

    const initialTweetUpdate = {
        title: "",
        content: "",
    };

    const [ currentTweet, setCurrentTweet ] = useState(initialTweetUpdate);
    
    useEffect(
        () => {
            const { tweet } = props;

            if(tweet)
                setCurrentTweet({
                    title: tweet.title,
                    content: tweet.content
                });
        }
        ,[ props ]
    );
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentTweet({ ...currentTweet, [name]: value });
    }

    const handleSubmitTweetForm = (event)=>{
        event.preventDefault();

        const updateTweet = {
            title: currentTweet.title.trim(),
            content: currentTweet.content.trim()
        }

        props.handleTweetUpdate(updateTweet);

    }

    return (
        <React.Fragment>
            <TopMostContent title="Edit Tweet" />
            <hr className="m-0" />
            <div className="container-fluid py-3 px-3">
                <form id="updateTweetForm"
                    onSubmit={ handleSubmitTweetForm }>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" 
                            className="form-control" 
                            id="title" 
                            placeholder="Enter title" 
                            name="title"
                            value={ currentTweet.title }
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
                                value={ currentTweet.content }
                                onChange={ handleInputChange }>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                className="btn btn-primary rounded-pill text-white p-3 w-50 d-block m-auto">Update</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default EditTweet;