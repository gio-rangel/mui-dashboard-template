import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
}

export const getAccessToken = (): string => {
    const token = localStorage.getItem('accessToken')
    if(token) {
      return token
    } else {
      return ''
    }
}

export const getRefreshToken = (): string => {
    const token = localStorage.getItem('refreshToken')
    if(token) {
      return token
    } else {
      return ''
    }
}

const reducer = {
    setAccessToken: (state: AuthState, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken: (state: AuthState, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    setLoginData: (
      state: AuthState,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>,
    ) => {
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
  
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      
      // save to local storage
      if (action.payload.refreshToken && action.payload.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    logout: (state: AuthState) => {
      state.accessToken = null;
      state.refreshToken = null;

      // delete from local storage
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: reducer,
});

// Action creators are generated for each case reducer function
export const { 
    setAccessToken, 
    setRefreshToken,
    setLoginData, 
    logout,  
} = authSlice.actions;

export default authSlice.reducer;