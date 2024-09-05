import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse, ApiResponseExtended, Category, Product, itemsApiParams} from "../../types/types";
import {buildUrl, clearParams} from "../../utils/common";
import {BASE_URL, PRODUCTS_PER_PAGE} from "../../utils/CONSTS";

export const categoriesApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/api`}), // правильный синтаксис baseQuery
    endpoints: (builder) => ({
        getCategories: builder.query<ApiResponse<Category[]>, void>({
            query: () => `/categories`,
        }),
        getCategoryProducts: builder.query<ApiResponseExtended<Product[]>, {
            id: string,
            params?: itemsApiParams,
        }>({
            query: ({id, params = {}}) => buildUrl(`/category/${id}/products`, clearParams({
                'pagination[per_page]': PRODUCTS_PER_PAGE,
                ...params,
            })),
        }),
    }),
});

export const {useGetCategoriesQuery, useGetCategoryProductsQuery} = categoriesApi;