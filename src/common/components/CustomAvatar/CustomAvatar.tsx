import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { FC } from 'react';

export interface IAvatarProps {
    username: string;
    avatarUrl: string;
}

export const UserAvatar: FC<IAvatarProps> = ({ username, avatarUrl }) => {
    const initials = username.slice(0, 1).toUpperCase();
    const avatarColor = deepOrange[500];

    return (
        <Avatar alt={username} src={avatarUrl} sx={{ bgcolor: avatarUrl ? 'transparent' : avatarColor }}>
            {avatarUrl ? null : initials}
        </Avatar>
    );
};
