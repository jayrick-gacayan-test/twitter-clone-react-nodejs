import React from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../services/auth_service';
import TopMostContent from '../layouts/TopMostContent';

const fileImageBaseUrl = "http://localhost:3001/files";

const ProfileInfo = ({ user, thereUser}) => {
    let navigate = useNavigate();
    const joinedAt = !user ? null : new Date(user.createdAt);
    const firstName = user.firstName !== null ? user.firstName : "";
    const lastName = user.lastName !== null ? user.lastName : "";

    return(
        thereUser && 
        <React.Fragment>
            <TopMostContent title="Profile" />
            <hr className="m-0"/>
            <div className="mt-3"
                style={{
                    height: "200px",
                    backgroundColor: "skyblue"
                }}>
            </div>
            <div className="position-relative clearfix justify-content-between p-3">
                <span 
                    className="mb-3 d-flex justify-content-center text-white"
                    style={{
                    borderRadius: "50%",
                    height: "140px",
                    width: "140px",
                    border: "3px solid white",
                    display: "inline-block",
                    position: "absolute",
                    top: "-60px",
                    left: "20px",
                    zIndex: 5,
                    backgroundColor: "white"
                }}>
                {
                    user.userImage && 
                    <img src={ `${ fileImageBaseUrl }/profile/${user.userImage}`}
                        alt={`${ user.firstName }-pic`}
                        className="rounded-circle d-inline-block"
                        style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            zIndex: 8,
                        }}/>
                }
                </span>
                {
                    AuthService.getCurrentUser() && AuthService.getCurrentUser().id === user.id && 
                    (
                        <button type="button" 
                            className="btn btn-outline-info rounded-pill float-end" 
                            onClick={
                                () => {
                                    navigate(`/profile/${ user.id}/edit`);
                                }
                            }>Edit Profile</button>
                    )
                }
            </div>
            <div className="container-fluid py-3 px-3 mt-5">
                <p className="font-weight-bold mt-3">
                    <span className="fs-5 me-1 text-dark fw-bold">{ `${ firstName } ${ lastName }`}</span>
                    <span className="lead fs-5 align-baseline">@ { user.email }</span>
                    <span className="d-block">
                        <i className="bi bi-calendar-fill me-1"></i>
                        Joined { " " }
                        { user && joinedAt.toLocaleString("default", { month: "long" }) } { " " }
                        { joinedAt.getDate() }, { joinedAt.getFullYear() } 
                    </span>
                </p>
                <p className="font-weight-bold mt-3">
                    <span className="px-2">Followers</span>
                    <span className="px-2">Following</span>
                </p>  
            </div>
        </React.Fragment>
    )
};

export default ProfileInfo;