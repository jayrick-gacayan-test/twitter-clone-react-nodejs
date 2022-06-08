import React from 'react';
import { useNavigate } from 'react-router-dom';

/* Components */
import SideNavigation from './SideNavigation';
import Modal from './Modal';

/* services */
import AuthService from '../../services/auth_service';

/* css */
import './side.navigation.css';
import './danger.modal.css';

/* utility */
import ModalUtility from '../../utilities/modal_utility';

const LeftSideContent = () => {
    //const { id } = AuthService.getCurrentUser();
    let navigate = useNavigate();

    const logOut = () => {
        AuthService.logout();
        navigate("/");
    };

    const openModalLogout = () => {
        const modalLogout = document.getElementById('modalLogout');
        ModalUtility.showModal(modalLogout);
    }

    return (
        <React.Fragment>
            <nav id="sidebar-navigation" 
                className="col-lg-3 d-none d-lg-block">
                <div id="sidebar-content" className="p-lg-3 bg-white p-3 d-flex justify-content-between flex-column"
                    style={{
                        height: "100%"
                    }}>
                    <SideNavigation userId={ AuthService.getCurrentUser() ? AuthService.getCurrentUser().id: null }/>
                    {
                        AuthService.getCurrentUser() && 
                        (
                            <div className="my-2 mb-auto">
                                <button type="button" 
                                    className="btn btn-info text-white btn-lg w-100 rounded-pill"
                                    onClick={ openModalLogout }>Logout</button>
                            </div>
                        )
                    }
                </div>
            </nav>
            <Modal idModal="logoutModal"
                ariaLabel="Account Logout">
                <div className="modal-danger-confirm">
                    <div className="modal-header justify-content-center">
                        <div className="icon-box d-flex justify-content-center">
                            <i className="bi bi-x-lg"></i>
                        </div>
                    </div>
                    <div className="modal-body text-center">
                        <h4>Ooops!</h4>	
                        <p>Are you sure you want to log-out</p>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-info rounded-pill text-white">
                                Cancel
                            </button>
                            <button className="btn btn-danger rounded-pill text-white">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default LeftSideContent;