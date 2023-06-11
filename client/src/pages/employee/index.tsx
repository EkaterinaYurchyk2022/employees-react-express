import React, {useState} from 'react';
import {Navigate, useNavigation, useParams} from 'react-router-dom';
import {useEditEmployeeMutation, useGetEmployeeQuery} from '../../app/services/employees';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/auth/authSlice';
import Layout from '../../components/layout';
import {Descriptions} from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';

const Employee = () => {
    const navigate = useNavigation();
    const params = useParams<{ id: string }>();

    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const user = useSelector(selectUser);
    const {data, isLoading} = useGetEmployeeQuery(params.id || '');
    const [employee] = useEditEmployeeMutation();

    if (isLoading) {
        return <span>Идет загрузка</span>
    }

    if (!data) {
        return <Navigate to="/"/>
    }

    return (
        <Layout>
            <Descriptions title="Информация о сотруднике" bordered>
                <DescriptionsItem label="Имя" span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </DescriptionsItem>
                <Descriptions.Item label="Возраст" span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="Адрес" span={3}>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
        </Layout>
    );
};

export default Employee;