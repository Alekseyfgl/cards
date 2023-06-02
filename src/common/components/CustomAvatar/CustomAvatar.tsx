import Avatar from '@mui/material/Avatar';
import deepOrange from '@mui/material/colors/deepOrange';
import {FC} from 'react';
import {Optional} from "../../utils/optionalTypes/optional.types";

export interface IAvatarProps {
    username: string;
    avatarUrl: Optional<string>
}

export const UserAvatar: FC<IAvatarProps> = ({username, avatarUrl}) => {
    const initials = username.slice(0, 1).toUpperCase();
    const avatarColor = deepOrange[500];

    return <Avatar alt={initials} src={avatarUrl} sx={{bgcolor: avatarUrl ? avatarColor : 'transparent'}}/>
};
