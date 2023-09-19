import { baseApi } from '../base-api/base-api';

const decksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDecks: builder.query<any, void>({
            query: () => ({ url: 'v1/decks', method: 'GET' }),

            providesTags: ['Decks'],
        }),
        createDeck: builder.mutation<any, { name: string }>({
            query: ({ name }) => ({
                url: 'v1/decks',
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: ['Decks'],
        }),
    }),
});

export const { useGetDecksQuery, useCreateDeckMutation } = decksApi;
