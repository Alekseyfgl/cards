import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { GlobalNotify } from '../GlobalNotify/GlobalNotify';
import { CustomAppBar } from '../../../features/Header/Header';
import React from 'react';

export const Layout = () => {
    console.log('Layout');
    return (
        <>
            <GlobalNotify />
            <CustomAppBar />
            <Container maxWidth="lg" sx={{ p: 8 }}>
                <Outlet />
            </Container>
        </>
    );
};
