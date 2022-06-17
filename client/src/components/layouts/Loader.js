import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center p-3">
            <div className="spinner-border fs-3" 
                role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;