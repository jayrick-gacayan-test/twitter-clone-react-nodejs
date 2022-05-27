import React from 'react';

import FollowerItem from './FollowerItem';

import AuthService from '../../services/auth_service';

const FollowerList = (props) => {
    const { users } = props;

    const { id } = AuthService.getCurrentUser();
    return (
        users.length > 0 &&
        users.map((user) => {
            if(user.id !== id)
                return(
                    <FollowerItem key={ user.id }
                        user={ user }
                    />
                )
        })
    );
}

export default FollowerList;