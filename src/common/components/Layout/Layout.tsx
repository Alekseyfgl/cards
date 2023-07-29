import {Outlet} from "react-router-dom";
import Container from "@mui/material/Container";
import {GlobalNotify} from "../GlobalNotify/GlobalNotify";
import {ResponsiveAppBar} from "../../../features/Header/Header";
import React from "react";

export const Layout = () => {
    return (
        <>
            <GlobalNotify/>
            <ResponsiveAppBar/>
            <Container maxWidth="lg" sx={{p: 8} }>
                <Outlet/>
            </Container>
        </>
    )
}