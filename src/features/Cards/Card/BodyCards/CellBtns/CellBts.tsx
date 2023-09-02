import { FC } from 'react';

interface CellBtsProps {
    authorId: string;
    profileId: string;
    rowPackId: string;
    question: string;
    answer: string;
}

export const CellBts: FC<CellBtsProps> = (props) => {
    const { profileId, rowPackId, question, answer, authorId } = props;
    return <></>;
};
