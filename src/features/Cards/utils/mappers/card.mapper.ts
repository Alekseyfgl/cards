import { CardQueryTypes, ICardsByPack } from '../../cards.interfaces';

export const queryCardsMapper = (query: CardQueryTypes): CardQueryTypes => {
    const { sortCards = '0grade', page = '1', pageCount = '10', cardsPack_id } = query;
    return { sortCards, page, pageCount, cardsPack_id };
};

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
