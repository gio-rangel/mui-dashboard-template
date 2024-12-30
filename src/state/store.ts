/**
 * Redux Toolkit
 * documentation source: https://redux-toolkit.js.org/introduction/getting-started
 * Redux Persist
 * documentation source: https://github.com/rt2zz/redux-persist#readme
 */
import { combineReducers,configureStore } from '@reduxjs/toolkit';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './slices/authSlice';
import { AuthApi } from '../api/core/AuthApi';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});

const persistConfig = {
  key: 'root', // Clave principal bajo la cual se almacenará el estado
  storage,  // Tipo de almacenamiento que se utilizará (localStorage)
  whitelist: ['auth', 'preferences', 'user'], // Lista blanca de slices a persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(AuthApi.middleware),
  devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };