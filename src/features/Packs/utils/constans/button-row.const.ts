import SchoolIcon from '@mui/icons-material/School';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type PackActionTypes = 'learn' | 'change' | 'remove';
export const buttonRowConst = [
    {
        id: 'learn',
        action: 'learn',
        icon: SchoolIcon,
    },
    {
        id: 'change',
        action: 'change',
        icon: ModeEditOutlineIcon,
    },
    {
        id: 'remove',
        action: 'remove',
        icon: DeleteForeverIcon,
    },
] as const;
