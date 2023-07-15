import { BasicModal } from '../GlobalModal';
import React, { FC } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SendRequestButton } from '../../ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';

interface AddModalProps {
    title: string;
    maxLength?: number;
}

export const AddModal: FC<AddModalProps> = (props) => {
    const { title, maxLength = 30 } = props;

    return (
        <BasicModal title={title}>
            <div>
                <TextField label="Name pack" defaultValue="Normal" variant="standard" fullWidth={true} inputProps={{ maxLength }} sx={{ marginBottom: 3 }} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Private pack" sx={{ marginBottom: 3 }} />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={false}>Save</SendRequestButton>
                    <Button variant="contained" color={'inherit'}>
                        Cancel
                    </Button>
                </div>
            </div>
        </BasicModal>
    );
};
