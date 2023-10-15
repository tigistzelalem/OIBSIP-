import Pizza from "@/types/pizza";
import { getCookie } from "@/utlis/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

const token = getCookie("token")
console.log('the token.....here', token)
export const pizzaApi = createApi({
    reducerPath: "pizza",
    tagTypes: ["Pizza"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // const token = getCookie("token");
            if (token) {
                headers.set("authorization", `bearer ${token}`);
            }

            return headers;

        }
    }),
    endpoints: (builder) => ({
        createPizza: builder.mutation<any, Partial<Pizza>>({

            query: (body: any) => {
                const formData = new FormData();
                for (const key in body) {
                    if (body[key]) {
                        formData.append(key, body[key]);
                    }
                }
                return {
                    url: "/pizza/createPizza",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Pizza"]
        }),

        getPizza: builder.query<any, string>({
            query: (_id) => `/pizza/getPizzaById/${_id}`,
            providesTags: ["Pizza"],
        }),

        getPizzas: builder.query<any, void>({
            query: () => "/pizza/getPizza",
            providesTags: ["Pizza"],
        }),

        deletePizza: builder.mutation({
            query: (_id) => ({
                url: `/pizza/deletePizza/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pizza"],
        }),

        updatePizza: builder.mutation<any, Partial<Pizza>>({
            query: (pizza) => ({
                url: `/pizza/updatePizza/${pizza._id}`, // Replace with your update endpoint
                method: 'PATCH',
                body: pizza,
            }),
        }),
    }),
});

export const {
    useGetPizzaQuery,
    useGetPizzasQuery,
    useCreatePizzaMutation,
    useDeletePizzaMutation,
    useUpdatePizzaMutation
} = pizzaApi;