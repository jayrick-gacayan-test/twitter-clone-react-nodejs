import React from 'react';

import CommentItem from './CommentItem';

const CommentList = (props) => {
    const { comments } = props;

    return (
        comments.length > 0 &&
        comments.map(
            (comment) => {
                return (<CommentItem key={ comment.id } 
                            comment={ comment }/>);
            }
        )
    );
}

export default CommentList;