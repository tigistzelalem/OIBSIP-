import Order from "@/types/order";
import { getCookie } from "@/utlis/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

export const orderApi = createApi({
    reducerPath: "order",
    tagTypes: ["Order"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        // prepareHeaders: (headers) => {
        //     const token = getCookie("token");
        //     if (token) {
        //         headers.set("authorization", `bearer ${token}`);
        //     }

        //     return headers;

        // }
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation<any, any>({
            query: ({ id, order }) => ({
                url: `/users/placeCustomizedOrder/${id} `,
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Order"],
        }),

        getOrder: builder.query<any, string>({
            query: (id) => `/admin/getOrder/${id}`,
            providesTags: ["Order"],
        }),

        getOrders: builder.query<any, void>({
            query: () => "/admin/getOrders",
            providesTags: ["Order"],
        }),

        // deletePizza: builder.mutation({
        //     query: (id) => ({
        //         url: `/pizza/deletePizza/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["Pizza"],
        // }),

        // updatePizza: builder.mutation<any, Partial<Pizza>>({
        //     query: (pizza) => ({
        //         url: `/pizza/updatePizza/${pizza._id}`, // Replace with your update endpoint
        //         method: 'PATCH',
        //         body: pizza,
        //     }),
        // }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderQuery
} = orderApi;