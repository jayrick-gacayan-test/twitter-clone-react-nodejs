import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';

import EditProfile from './Profile/EditProfile';
import ProfileInfo from './Profile/ProfileInfo';

/* services */
import UserService from '../services/user_service';
import AuthService from '../services/auth_service';
import Loader from './layouts/Loader';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';
import { sidebarResponsive } from '../utilities/sidebar_navigation_utility';

const Profile = () => {
    const { userId } = useParams();
    let location = useLocation();
    let navigate = useNavigate();

    const [ user, setUser ] = useState({});
    const [ thereUser, hasThereUser ] = useState(false);
    const [ errorText, setErrorText ] = useState(null);
    const [ loading, isLoading ] = useState(false);

    const [ currentUser, setCurrentUser ] = useState({
        firstName: "",
        lastName: "",
        userImage: ""
    });
    
    useEffect(
        () => {
            isLoading(true);

            const fetchCurrentUserTimeout = setTimeout(() => {
                fetchCurrentUser(userId);
                isLoading(false);
            }, 2000);

            const { innerWidth } = getScreenDimension();
            
            sidebarResponsive({ innerWidth });
            
            function handleResize(){
                const { innerWidth } = getScreenDimension();
                sidebarResponsive({ innerWidth });
            }
            window.addEventListener('resize', handleResize);

            return () => {
                clearTimeout(fetchCurrentUserTimeout);
                window.removeEventListener('resize', handleResize);
            }
        }
        ,[ userId ]
    );
    
    const fetchCurrentUser = (userId) => {
        UserService.getUser(userId)
                .then(
                    (response) =>{
                        
                        setUser(response.data);
                        hasThereUser(true);
                        setErrorText(null);
                        
                        if(AuthService.getCurrentUser()){
                            const userStorage = AuthService.getCurrentUser();
                            const { userImage } = response.data;
                            if(userImage !== userStorage.userImage)
                                localStorage.setItem("user",
                                        JSON.stringify({
                                                ...userStorage,
                                                userImage
                                            })
                                    );
                        }

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
    }
    const handleUserUpdate = (user) => {
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

                    alert(resMessage);
                }
            )
          
                
    }
        
    return (
        <React.Fragment>
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">
                    {
                        loading ? (<Loader />) :
                        (
                            <React.Fragment>
                            {
                                    errorText &&
                                    <div className="container-fluid py-2 px-3">
                                        <div className="alert alert-danger">
                                            { errorText }
                                        </div>
                                    </div>
                            }
                            {
                                user &&
                                location.pathname === `/profile/${ userId }/edit` ? 
                                <EditProfile user={ currentUser } 
                                            thereUser={ thereUser }
                                            handleUserUpdate={ handleUserUpdate } /> :
                                <ProfileInfo user={ user } 
                                            thereUser={ thereUser } />
                            }
                                <hr/>
                            </React.Fragment>
                        )
                    }
                    
                    
                    
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}

export default Profile;