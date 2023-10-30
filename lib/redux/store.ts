import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "./clientStorage";
import themeSlice from "./slices/themeSlice";
const themePersistConfig = {
  key: "theme",
  storage,
  // whitelist: ["mode"],
};

const themeReducer = combineReducers({
  themeMode: persistReducer(themePersistConfig, themeSlice),
});

export const store = configureStore({
  reducer: { theme: themeReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
