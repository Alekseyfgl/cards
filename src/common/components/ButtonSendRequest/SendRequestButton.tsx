import LoadingButton from '@mui/lab/LoadingButton';
import React, { FC, ReactNode } from 'react';


interface ISendRequestButtonProps {
    isSentRequest: boolean;
    children: ReactNode;
}

export const SendRequestButton: FC<ISendRequestButtonProps> = (props) => {
    const { isSentRequest, children } = props;
    return (
        <LoadingButton loading={isSentRequest}
                       type='submit'
                       variant='contained'
                       color='primary'
        >
            <span>{children}</span>
        </LoadingButton>
    );
};