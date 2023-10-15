import { getCookie } from "@/utlis/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000";

export const ingredientApi = createApi({
    reducerPath: "ingredient",
    tagTypes: ["Ingredient"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("token");
            if (token) {
                headers.set("authorization", `bearer ${token}`);
            }

            return headers;

        }
    }),
    endpoints: (builder) => ({
        createIngredient: builder.mutation<any, any>({
            query: ({ _id, ingredient }) => ({
                url: `/admin/createIngredient/${_id}`,
                method: "POST",
                body: ingredient,
            }),
            invalidatesTags: ["Ingredient"],
        }),

        getIngredient: builder.query<any, any>({
            query: (id) => `/admin/${id}`,
            providesTags: ["Ingredient"],
        }),

        getIngredients: builder.query<any, void>({
            query: () => `/admin/getIngredients`,
            providesTags: ["Ingredient"],
        }),

        deleteIngredient: builder.mutation({
            query: (id) => ({
                url: `/pizza/deletePizza/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Ingredient"],
        }),

    }),
});

export const {
    useCreateIngredientMutation,
    useGetIngredientQuery,
    useGetIngredientsQuery,
    useDeleteIngredientMutation

} = ingredientApi;