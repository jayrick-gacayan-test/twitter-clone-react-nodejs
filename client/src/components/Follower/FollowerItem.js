import React from 'react';

import DummyImage from '../layouts/DummyImage';
const FollowerItem = (props) => {

    const { user } = props;
    return (
        <li className="list-group-item d-flex bg-light">
            <div className="me-2">
                <DummyImage 
                    className="bg-light text-dark"
                    style={{
                        width: "60px",
                        height: "60px",
                        maxWidth: "60px",
                        maxHeight: "60px",
                    }}
                />
            </div>
            <div className="flex-grow-1 bg-light d-flex flex-xxl">
                <div className="">
                    <p className="font-weight-bold">{ user.firstName } { user.lastName } 
                        <a className="text-secondary d-block text-decoration-none" 
                            href={`/profile/${ user.id }`}>@{ user.email }</a>
                    </p>
                </div>
                <div className="ms-xxl-auto">
                    <button className="btn btn-outline-info">Follow</button>
                </div>
            </div>
        </li>
    );
};

export default FollowerItem;