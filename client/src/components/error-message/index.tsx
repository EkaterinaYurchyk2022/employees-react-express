import React from 'react';
import {Alert} from 'antd';

type PropsType = {
    message?: string
}
const ErrorMessage = ({message}: PropsType) => {
    if (!message) {
        return null
    }

    return <Alert message={message} type="error"/>
};

export default ErrorMessage;