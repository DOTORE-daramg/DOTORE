// Profile.tsx 
import React from 'react';

interface Props {
    children?: React.ReactElement | string;
}

function Profile({ children }: Props) {
    return <button>{children}</button>;
}

export default Profile;