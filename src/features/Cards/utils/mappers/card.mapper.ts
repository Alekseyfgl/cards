import { AddCardDto, ChangeCardDto, ICardsByPack } from '../../cards.interfaces';
import { AddCardFormValues } from '../../Modals/AddCardModal/AddCardModal';
import { ChangeCardFormValues } from '../../Modals/ChangeCardModal/ChangeCardModal';

export const getAllCardsMapper = (cardsByPack: ICardsByPack) => {
    return {
        cards: cardsByPack.cards,
        currentPack: {
            packUserId: cardsByPack.packUserId,
            cardsTotalCount: cardsByPack.cardsTotalCount,
            packName: cardsByPack.packName,
            page: cardsByPack.page,
            pageCount: cardsByPack.pageCount,
            maxGrade: cardsByPack.maxGrade,
            packCreated: cardsByPack.packCreated,
            packPrivate: cardsByPack.packPrivate,
            minGrade: cardsByPack.minGrade,
            packUpdated: cardsByPack.packUpdated,
            packDeckCover: cardsByPack.packDeckCover,
        },
    };
};

export const addCardDtoMapper = (dto: AddCardFormValues): AddCardDto => ({ card: dto });
export const changeCardDtoMapper = (dto: ChangeCardFormValues): ChangeCardDto => ({ card: dto });
