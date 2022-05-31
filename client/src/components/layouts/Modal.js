import React from 'react';

const Modal = ({ children, idModal, ariaLabel}) => {
    return (
        <div className="modal fade" 
            id={ idModal }
            tabIndex="-1" 
            role="dialog"
            aria-labelledby={ ariaLabel } 
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Modal;