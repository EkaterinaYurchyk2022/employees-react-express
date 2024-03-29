import React from 'react';
import {Form, Input} from 'antd';

type PropsType = {
    name: string
    placeholder: string
    type?: string
}
const CustomInput = ({name, placeholder, type = 'text'}: PropsType) => {
    return (
        <Form.Item
            name={name}
            rules={[{required: true, message: 'Обязательное поле'}]}
            shouldUpdate={true}
        >
            <Input placeholder={placeholder}
                   type={type}
                   size="large"
            />
        </Form.Item>
    );
};

export default CustomInput;