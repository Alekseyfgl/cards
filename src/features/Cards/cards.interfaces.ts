// ========== API ===============
import { getAllCardsMapper } from './utils/mappers/card.mapper';
import { SortTypes } from '../../common/utils/optionalTypes/sort.types';

export interface ICardsByPack {
    cards: ICard[];
    packUserId: string; //author id
    packName: string;
    packPrivate: boolean;
    packDeckCover: string;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
}

export interface ICard {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    question: string;
    answer: string;
    grade: number;
    shots: number;
    answerImg: string;
    comments: string;
    type: 'card';
    rating: number;
    more_id: string;
    created: string;
    updated: string;
}
export interface ICardQuery {
    page: string;
    pageCount: string;
    sortCards: CardSortCurrentTypes;
    // packName: string;
    cardsPack_id: string;
}
//============ domain ===============
export type CurrentPackType = Omit<ICardsByPack, 'cards'>;

export type ICardsByPackDomain = ReturnType<typeof getAllCardsMapper>;
export type CardSortTypes = 'question' | 'grade' | 'updated' | 'created';
export type CardSortCurrentTypes = `${SortTypes}question` | `${SortTypes}grade` | `${SortTypes}updated` | `${SortTypes}created`;
