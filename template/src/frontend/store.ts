import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  devTools: typeof window !== "undefined",
  preloadedState:
    // @ts-ignore
    typeof window === "undefined" ? undefined : window.__INITIAL_STATE__,
});

export default store;
