import { baseApi } from '../base-api/base-api';
import { DecksQuery, DecksResponse } from './types';

const decksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDecks: builder.query<DecksResponse, DecksQuery>({
            query: (params) => ({ url: 'v1/decks', method: 'GET', params }),

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
