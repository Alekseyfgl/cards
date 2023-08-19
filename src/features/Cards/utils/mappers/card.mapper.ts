import { CardQueryTypes } from '../../cards.interfaces';

export const queryCardsMapper = (query: CardQueryTypes): CardQueryTypes => {
    const { sortCards = '0grade', page = '1', pageCount = '10', cardsPack_id } = query;
    return { sortCards, page, pageCount, cardsPack_id };
};
