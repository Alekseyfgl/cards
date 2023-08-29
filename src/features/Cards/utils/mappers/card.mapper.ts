import { ICardsByPack } from '../../cards.interfaces';


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
