import React from 'react';

import '../custom.style.css';

const Avatar = ({ divClassName, imgSrc, imgAlt, imgAvatarSize }) => {
    return (
        <div className={ divClassName }>
            <img src={ imgSrc }
                alt={ imgAlt }
                className={ `rounded-circle d-inline-block ${ imgAvatarSize }` } />
        </div>
    );
}

export default Avatar;