import React from 'react';

const fileImageBaseUrl = "http://localhost:3001/files";
const FollowerItem = (props) => {

    const { user } = props;
    return (
        <li className="list-group-item d-flex bg-light">
            <div className="me-2 flex-shrink-1">
                <img src={ `${ fileImageBaseUrl }/profile/${user.userImage}`}
                    alt={`${ user.firstName }-image`}
                    className="rounded-circle d-inline-block"
                    style={{
                        width: "60px",
                        height: "60px",
                        maxWidth: "60px",
                        maxHeight: "60px",
                    }}/> 
            </div>
            <div className="flex-grow-1 bg-light d-flex flex-column flex-xxl-row justify-content-between">
                <div className="d-flex flex-wrap">
                    <p className="font-weight-bold">{ user.firstName } { user.lastName } 
                        <a className="text-secondary d-block text-decoration-none text-wrap" 
                            href={`/profile/${ user.id }`}>@{ user.email }</a>
                    </p>
                </div>
                <div className="d-flex">
                    <button className="btn btn-outline-info">Follow</button>
                </div>
            </div>
        </li>
    );
};

export default FollowerItem;