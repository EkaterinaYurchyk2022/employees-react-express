import React from 'react';
import {Form, Input} from 'antd';
import {NamePath} from 'antd/es/form/interface'

type PropsType = {
    name: string
    placeholder: string
    dependencies?: NamePath[]
}
const PasswordInput = ({name, placeholder, dependencies}: PropsType) => {
    return (
        <Form.Item
            name={name}
            dependencies={dependencies}
            hasFeedback
            rules={[{
                required: true,
                message: 'Обязательнок поле'
            }, ({getFieldValue}) => ({
                validator(_, value) {
                    if (!value) {
                        return Promise.resolve();
                    }
                    if (name === 'confirmPassword') {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли должны совпадать'))
                    } else {
                        if (value.length < 6) {
                            return Promise.reject(new Error('Пароль должен быть длиннее 6 символов'))
                        }
                        return Promise.resolve();
                    }
                }
            })]}
        >
            <Input.Password placeholder={placeholder} size="large"/>
        </Form.Item>
    );
};

export default PasswordInput;