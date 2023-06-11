import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import {ConfigProvider, theme} from 'antd';

import {store} from './app/store';
import {Paths} from './paths';

import Login from './pages/login';
import Register from './pages/register';
import Employees from './pages/employees';
import AddEmployee from './pages/addEmployee';
import Status from './pages/status';
import Employee from './pages/employee';
import EditEmployee from './pages/edit-employee';

import Auth from './features/auth/auth';

import './index.css';

const router = createBrowserRouter([
    {
        path: Paths.home,
        element: <Employees/>
    },
    {
        path: Paths.login,
        element: <Login/>
    },
    {
        path: Paths.register,
        element: <Register/>
    },
    {
        path: Paths.employeeAdd,
        element: <AddEmployee/>
    },
    {
        path: `${Paths.status}/:status`,
        element: <Status/>
    },
        {
        path: `${Paths.employee}/:id`,
        element: <Employee/>
    },
    {
        path: `${Paths.employeeEdit}/:id`,
        element: <EditEmployee/>
    },
])

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm
        }}>
            <Auth>
                <RouterProvider router={router}/>
            </Auth>
        </ConfigProvider>
    </Provider>
);
reportWebVitals();
