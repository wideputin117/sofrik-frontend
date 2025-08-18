import { encryptTransform } from "redux-persist-transform-encrypt";
import rootReducer, { RootState } from ".";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "../util/customStorage";

const rootReducerWithClear = (state: RootState | undefined, action: any) => {
  if (action.type === "sofrik/clearReduxState") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "Sofrik_client",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `helloclient2024`,
      onError: (err) => {
        console.error("Persist Transform Error:", err);
      },
    }),
  ],
};

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducerWithClear
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
