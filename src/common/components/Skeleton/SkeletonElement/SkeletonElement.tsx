import Skeleton from '@mui/material/Skeleton';
import React, { FC } from 'react';

interface SkeletonStringProps {
    type?: 'text' | 'rectangular' | 'circular';
    fontSize?: string;
    width?: string;
    height?: string;
    marginBottom?: string;
}

export const SkeletonElement: FC<SkeletonStringProps> = (props) => {
    const { fontSize = '1rem', type = 'text', height = '100%', width = '100%', marginBottom } = props;

    if (type === 'text') return <Skeleton variant={type} sx={{ fontSize }} />;

    return <Skeleton variant={type} sx={{ fontSize, height, width, marginBottom }} />;
};
