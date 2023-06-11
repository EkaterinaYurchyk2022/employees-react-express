import React, {useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from '../../app/services/employees';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/auth/authSlice';
import Layout from '../../components/layout';
import {Descriptions, Divider, Space} from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import {CustomButton} from '../../components/custom-button';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import ErrorMessage from '../../components/error-message';
import Modal from 'antd/es/modal/Modal';
import {Paths} from '../../paths';
import {isErrorWithMessage} from '../../utils/is-error-with-message';

const Employee = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const user = useSelector(selectUser);
    const {data, isLoading} = useGetEmployeeQuery(params.id || '');
    const [removeEmployee] = useRemoveEmployeeMutation();


    if (isLoading) {
        return <span>Идет загрузка</span>
    }

    if (!data) {
        return <Navigate to="/"/>
    }

    const showModal = () => {
        setModalOpen(true)
    }
    const hideModal = () => {
        setModalOpen(false)
    }

    const handleDeleteUser = async () => {
        hideModal()
        try {
            await removeEmployee(data.id).unwrap();
            navigate(`${Paths.status}/deleted`)
        } catch (error) {
            const mayBeError = isErrorWithMessage(error)
            if (mayBeError) {
                setError(error.data.message)
            } else {
                setError('Неизвестная ошибка')
            }
        }
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
            {
                user?.id === data.userId && (
                    <>
                        <Divider orientation="left">Действия</Divider>
                        <Space>
                            <Link to={`/employee/edit/${data.id}`}>
                                <CustomButton
                                    shape="round"
                                    type="default"
                                    icon={<EditOutlined/>}
                                >
                                    Редактировать
                                </CustomButton>
                            </Link>
                            <CustomButton
                                shape="round"
                                danger
                                onClick={showModal}
                                icon={<DeleteOutlined/>}
                            >
                                Удалить
                            </CustomButton>
                        </Space>
                    </>
                )
            }
            <ErrorMessage message={error}/>
            <Modal
                title="Подтвердите удаление"
                open={modalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText="Подтвердить"
                cancelText="Отменить"
            >
                Вы действительно хотите удалить сотрудника из таблицы?
            </Modal>
        </Layout>
    );
};

export default Employee;