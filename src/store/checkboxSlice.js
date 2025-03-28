import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Все: true,
  "Без пересадок": true,
  "1 пересадка": true,
  "2 пересадки": true,
  "3 пересадки": true,
};

const checkboxSlice = createSlice({
  name: "checkboxes",
  initialState,
  reducers: {
    toggleCheckbox(state, action) {
      const nameFilter = action.payload;

      if (nameFilter === "Все") {
        const isChecked = !state["Все"];
        Object.keys(state).forEach((key) => (state[key] = isChecked));
      } else {
        state[nameFilter] = !state[nameFilter];

        if (state["Все"]) {
          state["Все"] = false;
        }

        const allChecked = Object.keys(state)
          .filter((key) => key !== "Все")
          .every((key) => state[key] === true);

        if (allChecked) {
          state["Все"] = true;
        }
      }
    },
  },
});

export const { toggleCheckbox } = checkboxSlice.actions;
export default checkboxSlice.reducer;
