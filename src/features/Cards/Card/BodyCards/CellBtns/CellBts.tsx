import React, { FC, MouseEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import { buttonRowConst, PackActionTypes } from '../../../../Packs/utils/constans/button-row.const';
import TableCell from '@mui/material/TableCell';
import { RemoveCardModal } from '../../../Modals/RemoveCardModal/RemoveCardModal';
import { ICardQuery } from '../../../cards.interfaces';
import { ChangePackModal } from '../../../Modals/ChangeCardModal/ChangeCardModal';

interface CellBtsProps {
    authorId: string;
    profileId: string;
    question: string;
    answer: string;
    cardId: string;
    questionImg: string;
    query: ICardQuery;
}

export const CellBts: FC<CellBtsProps> = (props) => {
    const { profileId, cardId, question, answer, authorId, query, questionImg } = props;
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);

    const btnsElements = buttonRowConst.filter((btn) => authorId === profileId && btn.id !== 'learn');

    const closeRemoveModal = () => setIsOpenRemoveModal(false);
    const closeChangeModal = () => setIsOpenChangeModal(false);

    const onClickHandler = (actionType: PackActionTypes, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        switch (actionType) {
            case 'remove':
                setIsOpenRemoveModal(true);
                break;
            case 'change':
                setIsOpenChangeModal(true);
                break;
        }
    };

    return (
        <TableCell align="center">
            <RemoveCardModal cardId={cardId} closeModal={closeRemoveModal} query={query} isOpen={isOpenRemoveModal} key={cardId} />
            <ChangePackModal
                closeModal={closeChangeModal}
                isOpen={isOpenChangeModal}
                query={query}
                cardId={cardId}
                questionImg={questionImg}
                answer={answer}
                question={question}
            />
            {btnsElements.map((button) => (
                <IconButton
                    key={button.id}
                    name={cardId} //id row for different actions
                    onClick={(e) => onClickHandler(button.action, e)}
                >
                    <button.icon />
                </IconButton>
            ))}
        </TableCell>
    );
};
