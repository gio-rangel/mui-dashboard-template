import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { API_URL } from './ApiPaths';
import { getAccessToken, logout, setAccessToken, setRefreshToken } from '../state/slices/authSlice';
import { LoginResponse } from './core/AuthApi';
import { RootState } from '../state/store';

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers) {
      const jwt = getAccessToken()
      jwt && headers.set('Authorization', `Bearer ${jwt}`);
      return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
  ) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      
      // try to get a new token    
      const refreshResult = await baseQuery(
        {
          url: 'auth/refresh',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${(api.getState() as RootState).auth.accessToken}`,
          },
          body: {
            refreshToken: `${(api.getState() as RootState)?.auth?.refreshToken}`
          }
        },
        api,
        extraOptions,
      );
      if (refreshResult.data) {
        // store the new token
        api.dispatch(setAccessToken((refreshResult.data as LoginResponse).accessToken));
        api.dispatch(setRefreshToken((refreshResult.data as LoginResponse).refreshToken));
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
    return result;
};