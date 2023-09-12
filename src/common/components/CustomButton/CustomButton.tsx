import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/styles';

export type ButtonProps = {
    fullWidthProp?: boolean;
    children: ReactNode;
    startIcon?: ReactNode;
    disabled?: boolean;
    marginBottom?: string;
    color?: 'inherit' | 'primary' | 'success' | 'error' | 'info' | 'warning';
    onClick?: () => void;
};

const StylesButton = styled(Button)({
    padding: '4px 16px',
    borderRadius: 5,
});

export const CustomButton: FC<ButtonProps> = (props) => {
    const { children, fullWidthProp, disabled, startIcon, marginBottom = null, color = 'primary', onClick } = props;

    return (
        <StylesButton
            onClick={onClick}
            fullWidth={fullWidthProp}
            disabled={disabled}
            startIcon={startIcon ?? null}
            variant={'contained'}
            color={color}
            sx={{ marginBottom }}
        >
            {children}
        </StylesButton>
    );
};
