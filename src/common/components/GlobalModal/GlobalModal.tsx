import * as React from 'react';
import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import s from './styles.module.scss';

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    minWidth: '320px',
    bgcolor: 'background.paper',
    border: '2px solid ##343D40',
    boxShadow: 24,
    borderRadius: 1,
};

interface GlobalModalProps {
    title?: string;
    children: ReactNode;
    isOpen: boolean;
    commonHandleClose: () => void;
    width?: string;
    height?: string;
    customHandleClose?: () => void;
}

export const BasicModal: FC<GlobalModalProps> = (props) => {
    const { isOpen, title, commonHandleClose, customHandleClose, children, width = '25%', height = 'auto' } = props;
    return (
        <>
            {/*onClick={(e) => e.stopPropagation()} it's important*/}
            <Modal open={isOpen} onClose={commonHandleClose} onClick={(e) => e.stopPropagation()}>
                <Box sx={{ ...style, width, height }}>
                    <div className={`${s.header} ${s.wr}`}>
                        <p className={s.title}>{title}</p>
                        <IconButton onClick={customHandleClose ? customHandleClose : commonHandleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={`${s.wr} ${s.body}`}>{children}</div>
                </Box>
            </Modal>
        </>
    );
};
