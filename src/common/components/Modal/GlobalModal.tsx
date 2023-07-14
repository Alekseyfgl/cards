import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FC, ReactNode } from 'react';
import * as child_process from 'child_process';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

interface GlobalModalProps {
    children: ReactNode;
}

export const BasicModal: FC<GlobalModalProps> = (props) => {
    const { children } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        {children}
                    </div>

                </Box>
            </Modal>
        </div>
    );
};