import { ICardDto, ICardsByPack } from '../../cards.interfaces';
import { AddCardFormValues } from '../../Modals/AddCardModal/AddCardModal';

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

export const addCardDtoMapper = (dto: AddCardFormValues): ICardDto => ({ card: dto });
