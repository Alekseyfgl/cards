import LoadingButton from '@mui/lab/LoadingButton';
import React, { FC, ReactNode } from 'react';

interface ISendRequestButtonProps {
    isSentRequest: boolean;
    children: ReactNode;
    disabled?: boolean;
}

export const SendRequestButton: FC<ISendRequestButtonProps> = (props) => {
    const { isSentRequest, disabled, children } = props;
    return (
        <LoadingButton loading={isSentRequest} disabled={disabled} type="submit" variant="contained" color="primary">
            <span>{children}</span>
        </LoadingButton>
    );
};
