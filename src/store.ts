import feedReducer from '@/slices/feedSlice';
import messagingReducer from '@/slices/messagingSlice';
import userReducer from '@/slices/userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import configReducer from './slices/configSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'config'],
};

const configPersistConfig = {
  key: 'config',
  storage,
  whitelist: [
    'lastFetchedFollowing',
    'lastFetchedLikes',
    'lastFetchedPostBookmarks',
    'lastFetchedProjectBookmarks',
    'lastFetchedOpeningBookmarks',
    'lastFetchedChats',
    'lastFetchedProjects',
    'lastFetchedContributingProjects',
    'lastFetchedApplications',
    'lastFetchedUnreadNotifications',
    'lastFetchedUnreadInvitations',
  ],
};

const feedPersistConfig = {
  key: 'feed',
  storage,
  whitelist: ['unreadNotifications', 'unreadInvitations', 'unreadChats'],
};

const rootReducer = combineReducers({
  feed: persistReducer(feedPersistConfig, feedReducer),
  user: userReducer,
  messaging: messagingReducer,
  config: persistReducer(configPersistConfig, configReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV == 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
