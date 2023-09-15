import StarIcon from '@mui/icons-material/Star';
import { FC } from 'react';
import { Rating } from '@mui/material';

interface GradeProps {
    value: number;
}
export const Grade: FC<GradeProps> = (props) => {
    return <Rating name="text-feedback" value={props.value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />;
};
