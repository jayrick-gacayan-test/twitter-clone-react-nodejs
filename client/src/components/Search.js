import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/* components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TopMostContent from './layouts/TopMostContent';
import UserList from './User/UserList';

/* services */
import UserService from '../services/user_service';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';
import { sidebarResponsive } from '../utilities/sidebar_navigation_utility';

const Search = () => {

    const [searchData, setSearchData] = useState([]);
    const [searchParams] = useSearchParams();

    let emailQuery = searchParams.get("email");

    useEffect(
        () => {
            fetchUsersByEmail(emailQuery ? emailQuery : '');
            
            const { innerWidth } = getScreenDimension();
            
            sidebarResponsive({ innerWidth });
            
            function handleResize(){
                const { innerWidth } = getScreenDimension();
                sidebarResponsive({ innerWidth });
            }
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
        ,[emailQuery]
    );

    const fetchUsersByEmail  = (email) => {
        UserService.getAllUsersByEmail(email)
                .then(
                    (response) => {
                        setSearchData(response.data);
                    },
                    (error) => { console.log(error); }
                );
    };

    return (
        <React.Fragment>
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">
                <TopMostContent title="Search" />
                    <hr className="m-0"/>
                    <div className="container-fluid g-0 mt-3">
                        {
                            searchData.length > 0 &&
                            <UserList users={ searchData } />                            
                        }
                    </div>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}

export default Search;