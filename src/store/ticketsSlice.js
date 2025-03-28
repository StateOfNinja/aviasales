import { createSlice } from "@reduxjs/toolkit";
import { getSearchId, getTickets } from "./ticketsApiActions";

const initialState = {
  searchId: "",
  tickets: [],
  error: null,
  status: "",
  stop: false,
  visibilityTickets: 5,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    showTickets(state) {
      state.visibilityTickets += 5;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchId.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSearchId.fulfilled, (state, action) => {
      state.searchId = action.payload;
      state.status = "uploaded";
    });
    builder.addCase(getSearchId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getTickets.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      if (!state.stop) {
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.status = "uploaded";
        state.stop = action.payload.stop;
      }
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { showTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
