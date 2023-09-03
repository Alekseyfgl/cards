import React, { FC } from 'react';
import Tooltip from '@mui/material/Tooltip';

interface CustomTooltipProps {
    fullText: string;
    truncatedText: string;
}

export const CustomTooltip: FC<CustomTooltipProps> = (props) => {
    const { fullText, truncatedText } = props;
    return (
        <Tooltip title={fullText} placement="top">
            <div>{truncatedText}</div>
        </Tooltip>
    );
};
