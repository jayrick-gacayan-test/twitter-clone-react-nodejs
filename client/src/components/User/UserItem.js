import React from 'react';
import { useNavigate } from 'react-router-dom';

const fileImageBaseUrl = "http://localhost:3001/files";
const UserItem = (props) => {
    const { user } = props;
    let navigate = useNavigate();

    const joinedAt = !user ? null : new Date(user.createdAt);
    const firstName = user.firstName !== null ? user.firstName : "";
    const lastName = user.lastName !== null ? user.lastName : "";

    return (
        <React.Fragment>
            <div className="d-flex">
                <div className="ms-3">
                   
                    <img src={ user.userImage && `${fileImageBaseUrl}/profile/${user.userImage}`}
                        alt={`${ firstName }-pic`}
                        className="rounded-circle d-inline-block"
                        style={{
                            width: "60px",
                            height: "60px",
                            maxWidth: "60px",
                            maxHeight: "60px",
                        }}/>                   
                </div>
                <div className="flex-grow-1 px-3 d-flex justify-content-between">
                    <div onClick={
                        () => {
                            navigate(`/profile/${ user.id }`);
                            window.location.reload();
                        }
                    }>
                        <span className="d-block fw-bold fs-5">{ firstName } { lastName }</span>
                        <span className="d-block">@ { user.email }</span>
                        <span className="d-block">
                            <i className="bi bi-calendar-fill me-1"></i>
                            Joined { " " }
                            { user && joinedAt.toLocaleString("default", { month: "long" }) } { " " }
                            { joinedAt.getDate() }, { joinedAt.getFullYear() } 
                        </span>
                    </div>
                    <div>
                        <button className="btn btn-outline-info p-2">
                            Follow
                        </button>
                    </div>
                </div>
            </div>
            <hr className="mb-3" />
        </React.Fragment>
    )
};

export default UserItem;