import React from 'react';

const Modal = ({ children, idModal }) => {
    return (
        <div className="modal" id={ idModal }>
            <div className="modal-dialog">
                <div className="modal-content">
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Modal;