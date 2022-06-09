import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';

import EditProfile from './Profile/EditProfile';
import ProfileInfo from './Profile/ProfileInfo';

/* services */
import UserService from '../services/user_service';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';
import { sidebarResponsive } from '../utilities/sidebar_navigation_utility';

const Profile = () => {
    //const { id } = AuthService.getCurrentUser();
    const { userId } = useParams();
    let location = useLocation();
    let navigate = useNavigate();

    const [ user, setUser ] = useState({});
    const [ thereUser, hasThereUser ] = useState(false);
    const [ errorText, setErrorText ] = useState(null);

    const [ currentUser, setCurrentUser ] = useState({
        firstName: "",
        lastName: "",
        userImage: ""
    });

    useEffect(
        () => {
            const { innerWidth } = getScreenDimension();
            
            sidebarResponsive({ innerWidth });
            
            function handleResize(){
                const { innerWidth } = getScreenDimension();
                sidebarResponsive({ innerWidth });
            }
            window.addEventListener('resize', handleResize);

            UserService.getUser(userId)
                .then(
                    (response) =>{
                        setUser(response.data);
                        hasThereUser(true);
                        setErrorText(null);
                        
                        setCurrentUser({
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            userImage: response.data.userImage
                        });
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
            
            return () => window.removeEventListener('resize', handleResize);
        }
        ,[ userId ]
    );
    
    const handleUserUpdate = (user) => {
        console.log("user --- ", user);
        const { firstName, lastName, userImage } = user;
        
        UserService.updateProfile(userId, firstName, lastName, userImage)
            .then(
                (response) => {
                    alert("Message: " + response.data.message); 
                    navigate(`/profile/${ userId }`);
                },
                (error) => { 
                    
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.error) ||
                        error.message ||
                        error.toString() || error; 

                    console.log("Error ---- ", resMessage);
                }
            )
          
                
    }
        
    return (
        <React.Fragment>
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">
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
                        user &&
                        location.pathname === `/profile/${userId}/edit` ? 
                        <EditProfile user={ currentUser } 
                                    thereUser={ thereUser }
                                    handleUserUpdate={ handleUserUpdate } /> :
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