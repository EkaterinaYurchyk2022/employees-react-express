import React, {useEffect, useState} from 'react';
import Layout from '../../components/layout';
import {Row} from 'antd';
import EmployeeForm from '../../components/employee-form';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/auth/authSlice';
import {useAddEmployeeMutation} from '../../app/services/employees';
import {Employee} from '@prisma/client';
import {Paths} from '../../paths';
import {isErrorWithMessage} from '../../utils/is-error-with-message';

const AddEmployee = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap();
            navigate(`${Paths.status}/created`)
        } catch (err) {
            const mayBeError = isErrorWithMessage(err);
            if (mayBeError) {
                setError(err.data.message)
            } else {
                setError('Неизвестная ошибка')
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <EmployeeForm
                    btnText="Добавить"
                    title="Добавить сотрудника"
                    onFinish={handleAddEmployee}
                    error={error}
                />
            </Row>
        </Layout>
    );
};

export default AddEmployee;