import { configureStore } from "@reduxjs/toolkit";
import checkboxSlice from "./checkboxSlice";
import ticketsSlice from "./ticketsSlice";
import sortSlice from "./sortSlice";

const store = configureStore({
  reducer: {
    checkboxes: checkboxSlice,
    tickets: ticketsSlice,
    sort: sortSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
