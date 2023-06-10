import React from 'react';
import {useCurrentQuery} from '../../app/services/auth';

const Auth = ({children}: { children: JSX.Element }) => {
    const {isLoading} = useCurrentQuery();

    if (isLoading) {
        return <span>Идут загрузка...</span>
    }

    return children
};

export default Auth;