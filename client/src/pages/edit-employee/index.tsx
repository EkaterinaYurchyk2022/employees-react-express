import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Employee} from '@prisma/client';
import {useEditEmployeeMutation, useGetEmployeeQuery} from '../../app/services/employees';
import Layout from '../../components/layout';
import EmployeeForm from '../../components/employee-form';
import {Paths} from '../../paths';
import {isErrorWithMessage} from '../../utils/is-error-with-message';
import {Row} from 'antd';

const EditEmployee = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const [error, setError] = useState('');

    const {data, isLoading} = useGetEmployeeQuery(params.id || '');

    const [editEmployee] = useEditEmployeeMutation();

    if (isLoading) {
        return <span>Идет загрузка</span>
    }

    const handleEditUser = async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...data,
                ...employee
            }
            await editEmployee(editedEmployee).unwrap()
            navigate(`${Paths.status}/updated`)
        } catch (err) {
            const mayBeError = isErrorWithMessage(err)

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
                    title="Редактировать сотрудника"
                    btnText="Редактировать"
                    error={error}
                    employee={data}
                    onFinish={handleEditUser}
                />
            </Row>
        </Layout>
    );
};

export default EditEmployee;