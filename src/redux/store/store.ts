// import { setupListeners } from "@reduxjs/toolkit/query";
// setupListeners(store.dispatch);

import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

// export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
