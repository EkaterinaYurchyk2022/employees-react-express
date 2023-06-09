import React from 'react';
import Layout from '../../components/layout';
import {Card, Form, Row, Space, Typography} from 'antd';
import CustomInput from '../../components/custom-input';
import PasswordInput from '../../components/password-input';
import {CustomButton} from '../../components/custom-button';
import {Link} from 'react-router-dom';
import {Paths} from '../../paths';

const Register = () => {
    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Зарегистрируйтесь" style={{width: '30rem'}}>
                    <Form onFinish={() => null}>
                        <CustomInput
                            placeholder="Имя"
                            name="name"
                        /><CustomInput
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                        <PasswordInput
                            name="password"
                            placeholder="Пароль"
                        />
                        <PasswordInput
                            name="confirmPassword"
                            placeholder="Введите пароль еще раз"
                        />
                        <CustomButton
                            type="primary"
                            htmlType="submit"
                        >
                            Зарегистрироваться
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Уже зарегистрированы? <Link to={Paths.login}>Войти</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Register;