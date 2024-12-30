import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../BaseQuery';
import { AUTH_URL } from '../ApiPaths';

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  status: string;
  message: string; 
  code: string; 
  data?: {
    accessToken: string;
    refreshToken: string;
  }
}

export interface AuthApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth']
    }),
    register: builder.mutation<RegisterResponse, RegisterBody>({
      query: (body) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = AuthApi;
