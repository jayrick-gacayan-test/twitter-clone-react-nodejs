import React from 'react';
import { useNavigate } from 'react-router-dom';

/* Components */
import SideNavigation from './SideNavigation';

/* services */
import AuthService from '../../services/auth_service';

const LeftSideContent = () => {
    const { id } = AuthService.getCurrentUser();
    let navigate = useNavigate();

    const logOut = () => {
        AuthService.logout();
        navigate("/");
    };

    return (
        <div id="sidebar-navigation" 
            className="d-flex justify-content-between col-3 py-2 d-none d-lg-block"
            style={{
                position:'sticky',
                top:0,
                height: "100vh"
            }}>
            <SideNavigation userId={ id }/>
            <div className="my-2">
                <button type="button" 
                    className="btn btn-info text-white btn-lg w-100 rounded-pill">Tweet</button>
            </div>
            <div className="my-2 mb-auto">
                <button type="button" 
                    className="btn btn-info text-white btn-lg w-100 rounded-pill"
                    onClick={ logOut }>Logout</button>
            </div>
        </div>
    )
}

export default LeftSideContent;