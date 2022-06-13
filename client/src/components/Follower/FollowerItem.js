import React, { useState } from 'react';

/* services */
import AuthService from '../../services/auth_service';
import UserService from '../../services/user_service';

const fileImageBaseUrl = "http://localhost:3001/files";
const FollowerItem = (props) => {

    const { user } = props;

    const [ userFollowers, setUserFollowers ] = useState(user.followers);

    const [followed, setFollowed] = useState(
        !AuthService.getCurrentUser() ? false:
        ((userFollowers.filter(
                        (follower) => {
                            return AuthService.getCurrentUser() && 
                                (follower.follower === AuthService.getCurrentUser().id);
                        }
                    ))
                .length > 0 ? true : false)
    );

    const [followsCount, setFollowsCount] = useState(
                    (userFollowers.filter((follow) => { return follow.isFollowed; })).length
                );
    
    const handleFollowUser = (followingId) => {
        if(!AuthService.getCurrentUser())
        {
            alert("You must login first.");
            return;
        }

        UserService.followUser(followingId, AuthService.getCurrentUser().id)
                .then(
                    (response) => {
                        console.log("Data ---- ", response.data);

                        const followUser = userFollowers.filter(
                            (follow) => {
                                return follow.follower === AuthService.getCurrentUser().id
                            }
                        );

                        setUserFollowers(
                            (followUser.length > 1) ? 
                            [ ...userFollowers, response.data] : 
                            userFollowers.map(
                                (follow) => {
                                    if(follow.follower === AuthService.getCurrentUser().id)
                                        return { ...follow, isFollowed: response.data.isFollowed };
                                    
                                    return follow;
                                }
                            )
                        );

                        setFollowed(response.data.isFollowed);
                        setFollowsCount(
                            (followsCount) => {
                                return followed ? followsCount - 1 : followsCount + 1;
                            }
                        );
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                            error.message ||
                            error.toString() || error;

                        alert(resMessage);
                    }
                );
    }

    return (
        <li className="list-group-item d-flex bg-light">
            <div className="me-2 flex-shrink-1">
                <img src={ `${ fileImageBaseUrl }/profile/${user.userImage}`}
                    alt={`${ user.firstName }-pic`}
                    className="rounded-circle d-inline-block"
                    style={{
                        width: "60px",
                        height: "60px",
                        maxWidth: "60px",
                        maxHeight: "60px",
                    }}/> 
            </div>
            <div className="flex-grow-1 bg-light d-flex flex-column flex-xxl-row justify-content-between">
                <div className="d-flex justify-content-center flex-column text-break ">
                    <p className="fw-bold">{ user.firstName } { user.lastName } 
                        <a className="text-secondary d-block text-decoration-none text-wrap" 
                            href={`/profile/${ user.id }`}>@{ user.email }</a> 
                        <span className="fw-normal d-block text-break">Followers : { followsCount }</span> 
                        <span className="fw-normal d-block text-break">Following : { user.followings.length }</span>    
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <button className={ `btn btn-sm rounded-pill btn${ followed ? `` : `-outline` }-info`}
                            onClick={ () => handleFollowUser(user.id) }>Follow{ `${ followed ? `ed` : `` }`}</button>
                </div>
            </div>
        </li>
    );
};

export default FollowerItem;