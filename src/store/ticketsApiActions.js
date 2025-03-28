import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchId = createAsyncThunk(
  "tickets/fetchGetSearchId",
  async () => {
    const response = await fetch(
      "https://aviasales-test-api.kata.academy/search"
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data.searchId;
  }
);

export const getTickets = createAsyncThunk(
  "tickets/fetchGetTickets",
  async (searchId) => {
    let tickets = [];
    let stop = false;
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data.tickets)) {
        tickets = data.tickets;
      } else {
        throw new Error("Invalid format data");
      }
      if (data.stop) {
        stop = true;
      }
    } catch (e) {
      console.log("Error", e);
      throw e;
    }
    return { tickets, stop };
  }
);
