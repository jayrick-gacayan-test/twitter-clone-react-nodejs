import React from 'react';

import '../custom.style.css';

const Avatar = ({ divClassName, imgSrc, imgAlt, imgAvatarSize }) => {
    const imgElement = React.createElement("img");
    //
    return (
        <div className={ divClassName }>
            <img src={ imgSrc }
                alt={ imgAlt }
                className={ `rounded-circle d-inline-block ${ imgAvatarSize }` } />
        </div>
    );
}

export default Avatar;