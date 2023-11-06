import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sessionReducer } from "./session/sessionSlice";
import { financeReducer } from "./finance/financeSlice";

const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    session: persistReducer(sessionPersistConfig, sessionReducer),
    finance: financeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
