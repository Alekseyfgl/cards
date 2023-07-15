import * as React from 'react';
import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import s from './styles.module.scss';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid ##343D40',
    boxShadow: 24,
    borderRadius: 1,
};

interface GlobalModalProps {
    title?: string;
    children: ReactNode;
}

export const BasicModal: FC<GlobalModalProps> = (props) => {
    const { title, children } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal open={open} onClose={handleClose}>
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
