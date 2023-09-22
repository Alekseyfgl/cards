import { Nullable } from '../../common/utils/types/optional.types';

export interface Pagination {
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface Author {
    id: string;
    name: string;
}

export interface Deck {
    id: string;
    userId: string;
    name: string;
    isPrivate: boolean;
    shots: number;
    cover: Nullable<string>;
    rating: number;
    isDeleted: Nullable<boolean>;
    isBlocked: Nullable<boolean>;
    created: string;
    updated: string;
    cardsCount: number;
    author: Author;
}

export interface DecksResponse {
    maxCardsCount: number;
    pagination: Pagination;
    items: Deck[];
}

export type DecksQuery = Partial<{
    minCardsCount: string;
    maxCardsCount: string;
    name: string;
    authorId: string;
    orderBy: string;
    currentPage: number;
    itemsPerPage: number;
}>;
