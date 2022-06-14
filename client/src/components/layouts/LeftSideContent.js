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
        const modalLogout = document.getElementById('modalLogout');
        ModalUtility.hideModal(modalLogout);
        navigate("/");
    };

    const openModalLogout = () => {
        const modalLogout = document.getElementById('modalLogout');
        ModalUtility.showModal(modalLogout);
    }

    const closeNotToLogout = () => {
        const modalLogout = document.getElementById('modalLogout');
        ModalUtility.hideModal(modalLogout);
    }

    return (
        <React.Fragment>
            <nav id="sidebar-navigation" 
                className="col-lg-3 d-none d-lg-block border-end">
                <div id="sidebar-content" 
                    className="p-lg-3 bg-white p-3 d-flex justify-content-between flex-column"
                    style={{
                        height: "100%"
                    }}>
                    <SideNavigation userId={ AuthService.getCurrentUser() ? AuthService.getCurrentUser().id: null }/>
                    {
                        AuthService.getCurrentUser() && 
                        (
                            <div className="my-2">
                                <button type="button" 
                                    className="btn btn-info text-white btn-lg w-100 rounded-pill"
                                    onClick={ openModalLogout }>Logout</button>
                            </div>
                        )
                    }
                </div>
            </nav>
            <Modal idModal="modalLogout"
                ariaLabel="Account Logout"
                confirmType="modal-danger-confirm"
                icon="bi-x-lg"
                h4Text="Ooops!"
                pText={ `Are you sure you want to log-out?` }>
                <div className="d-flex justify-content-around">
                    <div className="flex-fill p-1">
                        <button className="btn btn-info rounded-pill text-white w-100"
                            onClick={ closeNotToLogout }>
                            Cancel
                        </button>
                    </div>
                    <div className="flex-fill p-1">
                        <button className="btn btn-danger rounded-pill text-white w-100"
                            onClick={ logOut }>
                            Logout
                        </button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default LeftSideContent;