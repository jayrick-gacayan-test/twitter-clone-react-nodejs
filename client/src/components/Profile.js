import React, { useEffect, useState } from 'react';
import { matchPath, matchRoutes, useLocation, useNavigate, useParams, useResolvedPath } from 'react-router-dom';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';

import EditProfile from './Profile/EditProfile';
import ProfileInfo from './Profile/ProfileInfo';

/* services */
import UserService from '../services/user_service';
import AuthService from '../services/auth_service';

/* utilities */

const Profile = () => {
    //const { id } = AuthService.getCurrentUser();
    const { userId } = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    
    const [ user, setUser ] = useState({});
    const [ thereUser, hasThereUser ] = useState(false);
    const [ errorText, setErrorText ] = useState(null);
    
    useEffect(
        () => {
            UserService.getUser(userId)
                .then(
                    (response) =>{
                        setUser(response.data);
                        hasThereUser(true);
                        setErrorText(null);

                        
                    },
                    (error) => {
                        console.log("Error ---- ",error);
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                            error.message ||
                            error.toString() || error;

                        setErrorText(resMessage);
                        hasThereUser(false);
                    }
                );
        }
        ,[ userId ]
    );

    const joinedAt = !user ? null : new Date(user.createdAt);
    const firstName = user.firstName !== null ? user.firstName : "";
    const lastName = user.lastName !== null ? user.lastName : "";
    
    return (
        <React.Fragment>
            
            <div className="container-fluid row">
                <LeftSideContent />
                
                <main className="col-lg-6 g-0 border border-top-0 border-bottom-0">
                    {
                        errorText &&
                        (
                            <div className="container-fluid py-2 px-3">
                                <div className="alert alert-danger">
                                    { errorText }
                                </div>
                            </div>
                        )
                    }
                    {
                        location.pathname === `/profile/${userId}/edit` ? 
                        <EditProfile user={ user } 
                                    thereUser={ thereUser }/> :
                        <ProfileInfo user={ user } 
                                    thereUser={ thereUser } />
                    }
                    <hr/>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}

export default Profile;