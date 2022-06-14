import React from 'react';

const Modal = ({ children, idModal, ariaLabel, confirmType, icon, h4Text, pText }) => {
    return (
        <div className="modal fade" 
            id={ idModal }
            tabIndex="-1" 
            role="dialog"
            aria-labelledby={ ariaLabel } 
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" 
                role="document">
                <div className="modal-content">
                    <div className={ confirmType }>
                        <div className="modal-header justify-content-center">
                            <div className="icon-box d-flex justify-content-center">
                                <i className={ `bi ${ icon }` }></i>
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <h4>{ h4Text }</h4>	
                            <p>{ pText }</p>
                            { children }
                        </div>
                    </div>
                    
                    {/* <div className={ confirmType }>
                        <div className="modal-header justify-content-center">
                            <div className="icon-box d-flex justify-content-center">
                                <i className={ `bi ${ icon }` }></i>
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <h4>{ h4Text }</h4>	
                            <p>{ pText }</p>
                            { children }
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Modal;