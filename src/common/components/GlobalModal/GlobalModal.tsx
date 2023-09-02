import * as React from 'react';
import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import s from './styles.module.scss';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    border: '2px solid ##343D40',
    boxShadow: 24,
    borderRadius: 1,
};

interface GlobalModalProps {
    title?: string;
    children: ReactNode;
    isOpen: boolean;
    handleClose: (e?: unknown) => void;
}

export const BasicModal: FC<GlobalModalProps> = (props) => {
    const { isOpen, title, handleClose, children } = props;
    return (
        <div>
            <Modal open={isOpen} onClose={handleClose} onClick={(e) => e.stopPropagation()}>
                <Box sx={style}>
                    <div>
                        <div className={`${s.header} ${s.wr}`}>
                            <p className={s.title}>{title}</p>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div className={s.wr}>{children}</div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};
