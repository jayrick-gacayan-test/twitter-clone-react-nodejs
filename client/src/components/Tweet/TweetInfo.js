import React from 'react';

/* components */
import TopMostContent from '../layouts/TopMostContent';
import TweetItem from './TweetItem';
import Modal from '../layouts/Modal';

/* services */

/* utilities */
import ModalUtility from '../../utilities/modal_utility';

const TweetInfo = (props) => {
    const { tweet, thereTweet } = props;
    const closeNotToDeleteTweet = () => {
        const modalDeleteTweet = document.getElementById('modalDeleteTweet');
        ModalUtility.hideModal(modalDeleteTweet);
    };

    const deleteTweet = (id) => {
        
        const modalDeleteTweet = document.getElementById('modalDeleteTweet');
        ModalUtility.hideModal(modalDeleteTweet);

        props.handleDeleteTweet(id);
    }
    return (
        thereTweet &&
        <React.Fragment>
            <TopMostContent title="Tweet" />
            <hr className="mt-0"/>
            <div className="container-fluid g-0">
                <TweetItem tweet={ tweet } />
            </div>
            <Modal idModal="modalDeleteTweet"
                ariaLabel="Delete Tweet">
                <div className="modal-danger-confirm">
                    <div className="modal-header justify-content-center">
                        <div className="icon-box d-flex justify-content-center">
                            <i className="bi bi-x-lg"></i>
                        </div>
                    </div>
                    <div className="modal-body text-center">
                        <h4>Ooops!</h4>	
                        <p>Are you sure you want to delete the tweet ?</p>
                        <div className="d-flex justify-content-around">
                            <div className="flex-fill p-1">
                                <button className="btn btn-info rounded-pill text-white w-100"
                                    onClick={ closeNotToDeleteTweet }>
                                    Cancel
                                </button>
                            </div>
                            <div className="flex-fill p-1">
                                <button className="btn btn-danger rounded-pill text-white w-100"
                                    onClick={ () => { deleteTweet(tweet.id); } }>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default TweetInfo;
