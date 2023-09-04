

export const packHeadCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        sortBy: 'name',
    },
    {
        id: 'cards',
        numeric: false,
        disablePadding: false,
        label: 'Cards',
        sortBy: 'cardsCount',
    },
    {
        id: 'updated',
        numeric: false,
        disablePadding: false,
        label: 'Last Updated',
        sortBy: 'updated',
    },
    {
        id: 'created',
        numeric: false,
        disablePadding: false,
        label: 'Created By',
        sortBy: 'created',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
        sortBy: 'actions',
    },
] as const
