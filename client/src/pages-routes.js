import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/dasbhoard/Dashboard';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/sign-up/SignUp';
import Messages from './pages/dasbhoard/components/Body/components/Messages';
import Orders from './pages/dasbhoard/components/Body/components/Orders';
import Users from './pages/dasbhoard/components/Body/components/Users/Users';
import Items from './pages/dasbhoard/components/Body/components/Items/Items';
import Settings from './pages/dasbhoard/components/Body/components/Settings';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function PagesRoutes() {
    return (
        <BrowserRouter>
            {/* Warning Box - Pop-up */}
            <ToastContainer
                enableMultiContainer
                containerId={'warningContainer'}
                position="top-center"
                hideProgressBar
                pauseOnFocusLoss
                style={{ width: "50%" }}
                closeOnClick={false}
            />
            {/* Confirmation Box - Pop-up */}
            <ToastContainer
                enableMultiContainer
                containerId={'confirmationContainer'}
                position="bottom-center"
                autoClose={false}
                hideProgressBar
                pauseOnFocusLoss
                style={{ width: "50%" }}
                closeOnClick={false}
            />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />

                <Route path='dashboard' element={<Dashboard />}>
                    <Route path='messages' element={<Messages />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='items-list' element={<Items />} />
                    <Route path='users-list' element={<Users />} />
                    <Route path='settings' element={<Settings />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}