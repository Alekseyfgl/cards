// =========API==========
export interface IPack {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}

export interface IPacks {
    cardPacks: IPack[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}

interface IPackQuery {
    page: string
    pageCount: string
    sortPacks: string
}

export type PackQueryTypes = Partial<Record<keyof IPackQuery, string>>;


// ============DOMAIN============
export interface PacksRow {
    _id: string;
    name: string;
    cards: number;
    updated: string;
    created: string;
    actions: string;
}

export type PackSortTypes = `name` | "cardsCount" | "updated" | "created" | "actions"

export type PackSortRequestTypes =
    `${0 | 1}name`
    | `${0 | 1}cardsCount`
    | `${0 | 1}updated`
    | `${0 | 1}created`
    | `${0 | 1}actions`
    | ''

