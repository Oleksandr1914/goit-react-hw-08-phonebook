import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import { filtersReducer } from './filterSlice';
import authReducer from './registration/registrOperation';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  filters: filtersReducer,
  contacts: contactReducer,
  auth: persistedReducer,
});

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
