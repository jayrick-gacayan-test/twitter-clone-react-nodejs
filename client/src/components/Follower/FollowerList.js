import React, { useTransition } from 'react';

import FollowerItem from './FollowerItem';

import AuthService from '../../services/auth_service';

const FollowerList = (props) => {
    const { users } = props;

    //const { id } = AuthService.getCurrentUser();

    const userList = AuthService.getCurrentUser() ? users.filter(
        (user) => { return user.id !== AuthService.getCurrentUser().id }): users;

    return (
        userList.length > 0 &&
        userList.map(
            (user) => {
                return <FollowerItem key={ user.id }
                        user={ user } />
            }
        )
    );
}

export default FollowerList;