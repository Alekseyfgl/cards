import {IPack, PackSortRequestTypes, PacksRow} from '../../packs.interfaces';

export const createPackQuery = (page: number, pageCount: number, sortPacks: PackSortRequestTypes) => {
    console.log('sortPacks', sortPacks)
    return {
        page: page.toString(),
        pageCount: pageCount.toString(),
        // sortPacks: superSortCreator(sortPacks.slice(1) as PackSortTypes, sortPacks)
        sortPacks: sortPacks
    };
};

export const createRowPack = (packs: IPack[]): PacksRow[] => {
    return packs.map((p) => {
        return {
            _id: p._id,
            name: p.name,
            cards: p.cardsCount,
            created: p.created,
            updated: p.updated,
            actions: 'mock actions'
        };
    });
};