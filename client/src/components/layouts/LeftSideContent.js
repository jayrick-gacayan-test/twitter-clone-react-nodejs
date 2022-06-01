import React from 'react';
import { useNavigate } from 'react-router-dom';

/* Components */
import SideNavigation from './SideNavigation';

/* services */
import AuthService from '../../services/auth_service';

/* css */
import './side.navigation.css';

const LeftSideContent = () => {
    //const { id } = AuthService.getCurrentUser();
    let navigate = useNavigate();

    const logOut = () => {
        AuthService.logout();
        navigate("/");
    };

    return (
        <div id="sidebar-navigation" 
            className="col-3 d-none d-lg-block"
            style={{
                position:'sticky',
                top:0,
                height: "100vh"
            }}>
            <SideNavigation userId={ AuthService.getCurrentUser() ? AuthService.getCurrentUser().id: null }/>
            {
                AuthService.getCurrentUser() && 
                (
                    <React.Fragment>
                        <div className="my-2">
                            <button type="button" 
                                className="btn btn-info text-white btn-lg w-100 rounded-pill">Tweet</button>
                        </div>
                        <div className="my-2 mb-auto">
                            <button type="button" 
                                className="btn btn-info text-white btn-lg w-100 rounded-pill"
                                onClick={ logOut }>Logout</button>
                        </div>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default LeftSideContent;