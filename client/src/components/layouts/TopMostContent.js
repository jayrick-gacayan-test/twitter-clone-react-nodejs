import React from 'react';

const TopMostContent = ({ title }) => {

    return (
        <div className="container-fluid py-2 px-3 clearfix">
            <span className="fw-bold fs-3">{ title }</span>
            <span className="d-lg-none fw-bold fs-3 d-inline-block float-end"
                onClick={
                    () => {
                        const sidebarNavigation = document.getElementById("sidebar-navigation");

                        sidebarNavigation.classList.toggle("d-none");
                        sidebarNavigation.classList.toggle("width-0");
                    }
                }>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    className="bi bi-list" 
                    viewBox="0 0 16 16"
                    style={{
                        width: "120px",
                        height: "36px"
                    }}>
                    <path fillRule="evenodd" 
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </span>
        </div>
    )
};

export default TopMostContent;