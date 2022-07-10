import React from 'react';

import Avatar from '../layouts/Avatar';
import { TimePassed } from '../../utilities/date_utility';

const fileImageBaseUrl = "http://localhost:3001/files";
const CommentItem = (props) => {
    const { comment } = props;
    const commenterFirstName = comment.commenter.firstName || "";
    const commenterLastName = comment.commenter.lastName || "";

    return(
        <div className="d-flex mb-1">
            <Avatar divClassName={ `ms-3` }
            imgSrc={ `${ fileImageBaseUrl }/profile/${ comment.commenter.userImage }` }
            imgAlt={ `${ commenterFirstName }-pic` }
            imgAvatarSize="avatar-img-size-2"  />
            <div className="flex-grow-1 px-3 flex-column">
                <div className="bg-light rounded-3 py-1 px-3">
                    <span className="d-block d-flex">
                        <span className="me-2">{ commenterFirstName } { commenterLastName }</span>
                        <TimePassed date={ comment.createdAt } 
                                    spanClassName="me-1"/>
                    </span>
                    <span className="d-block d-flex">
                        { comment.text }
                    </span>
                </div>
            </div>
        </div>
    )
};

export default CommentItem;
