import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { GlobalNotify } from '../GlobalNotify/GlobalNotify';
import { CustomAppBar } from '../../../features/Header/Header';
import React, { FC, ReactNode } from 'react';

interface LayoutProps {
    children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
    const { children } = props;
    return (
        <>
            <GlobalNotify />
            <CustomAppBar />
            <Container maxWidth="lg" sx={{ p: 8 }}>
                {children ? children : <Outlet />}
            </Container>
        </>
    );
};
