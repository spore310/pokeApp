import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ThemeState {
  mode: "dark" | "light";
}

// Define the initial state using that type
const initialState: ThemeState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toogleLightMode: (state) => {
      if (typeof window !== "undefined") {
        const themeFromLocal = (typeof window !== "undefined" &&
          localStorage?.getItem("darkMode")) as ThemeState["mode"];
        if (themeFromLocal === state.mode) {
          localStorage.setItem(
            "darkMode",
            state.mode === "light" ? "dark" : "light"
          );
          state.mode = state.mode === "light" ? "dark" : "light";
        } else if (themeFromLocal) {
          localStorage.setItem(
            "darkMode",
            themeFromLocal === "light" ? "dark" : "light"
          );
          state.mode = themeFromLocal === "light" ? "dark" : "light";
        } else {
          localStorage.setItem(
            "darkMode",
            state.mode === "light" ? "dark" : "light"
          );
          state.mode = state.mode === "light" ? "dark" : "light";
        }

        console.log("done");
        // Perform localStorage action
      }
    },
    hydrateLightMode: (state) => {
      if (typeof window !== "undefined") {
        const themeFromLocal = (typeof window !== "undefined" &&
          localStorage?.getItem("darkMode")) as ThemeState["mode"];
        if (themeFromLocal) {
          state.mode = themeFromLocal === "dark" ? "dark" : "light";
        }
      }
    },
  },
});

export const { toogleLightMode, hydrateLightMode } = themeSlice.actions;

export default themeSlice.reducer;
