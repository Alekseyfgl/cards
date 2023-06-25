import SchoolIcon from '@mui/icons-material/School';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';

export const groupButtonRowConst = [
    {
        id: 'add',
        action: 'add',
        icon: <SchoolIcon />,
    },
    {
        id: 'change',
        action: 'change',
        icon: <ModeEditOutlineIcon />,
    },
    {
        id: 'remove',
        action: 'remove',
        icon: <DeleteForeverIcon />,
    },
] as const;
