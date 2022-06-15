import React from 'react';

const TopMostContent = ({ title }) => {

    return (
        <div className="container-fluid py-2 px-3 clearfix">
            <span className="fw-bold fs-3">{ title }</span>
            <span className="d-lg-none fw-bold fs-3 d-inline-block float-end me-3"
                data-bs-toggle="offcanvas" 
                data-bs-target="#sidebar-navigation" aria-controls="sidebar-navigation">
                <i className="bi bi-menu-app-fill"></i>
            </span>
        </div>
    )
};

export default TopMostContent;