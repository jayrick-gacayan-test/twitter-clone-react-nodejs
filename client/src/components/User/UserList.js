import React from 'react';

import UserItem from './UserItem';

const UserList = (props) => {
    const { users } = props;

    return (
        users.length > 0 && 
        users.map(
            (user) => {
                return <UserItem key={ user.id }
                                user={ user } />
            }
        )
    );
}

export default UserList;