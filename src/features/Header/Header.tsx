import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authThunks } from '../Auth/auth.slice';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '../../common/components/CustomAvatar/CustomAvatar';
import { selectorUserName, selectorUserPhoto } from '../Auth/auth.selector';
import { Nullable, Optional } from '../../common/utils/optionalTypes/optional.types';
// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const CustomAppBar = () => {
    console.log('AppBar');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userName: Optional<string> = useAppSelector(selectorUserName);
    const userPhoto: Optional<string> = useAppSelector(selectorUserPhoto);

    const [anchorElUser, setAnchorElUser] = useState<Nullable<HTMLElement>>(null);
    const isAppInitialized: boolean = useAppSelector((state) => state.app.isAppInit);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        dispatch(authThunks.logout({}))
            .unwrap()
            .then(() => {
                navigate('/login');
            });
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MEMORY
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MEMORY
                    </Typography>
                    {isAppInitialized && (
                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <UserAvatar username={userName!} avatarUrl={userPhoto} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => {
                                    if (setting === 'Logout') {
                                        return (
                                            <MenuItem
                                                key={setting}
                                                onClick={() => {
                                                    handleCloseUserMenu();
                                                    logoutHandler();
                                                }}
                                            >
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        );
                                    }
                                    return (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
