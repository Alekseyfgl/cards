import { baseApi } from '../base-api/base-api';

const decksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: 'v1/auth/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        singUp: builder.mutation<any, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: 'v1/auth/sing-up',
                method: 'POST',
                body: { email, password },
            }),
        }),
        // getDecks: builder.query<any, any>({
        //     query: (params) => ({ url: 'v1/decks', method: 'GET', params }),
        //
        //     providesTags: ['Decks'],
        // }),
    }),
});

export const { useLoginMutation, useSingUpMutation } = decksApi;
