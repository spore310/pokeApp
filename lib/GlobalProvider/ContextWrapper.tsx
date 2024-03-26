"use client";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ApolloWrapper } from "../../components/ApolloWrapper/ApolloWrapper";
import { ReduxProviders } from "../redux/provider";
import { usePokeAppDispatch, usePokeAppSelector } from "../redux/Hooks";
import { useEffect, useState } from "react";
import { hydrateLightMode } from "../redux/slices/themeSlice";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = usePokeAppSelector((state) => state.theme.themeMode.mode);
  const dispatch = usePokeAppDispatch();
  const [mode, setMode] = useState(theme);
  const darkTheme: Theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme: Theme = createTheme({
    palette: {
      mode: "light",
      success: {
        main: "#4fe3e1",
      },
      background: {
        default: "#F5F5DC",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#FB1B1B",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            // backgroundColor: "#4fe3e1",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: "#4fe3e1",
          },
        },
      },
    },
  });
  const themeFromLocal = (typeof window !== "undefined" &&
    localStorage?.getItem("darkMode")) as typeof theme;
  useEffect(() => {
    if (themeFromLocal) {
      dispatch(hydrateLightMode());
      setMode(themeFromLocal);
    } else {
      setMode(theme);
    }
  }, []);
  useEffect(() => {
    setMode(themeFromLocal);
  }, [themeFromLocal]);
  return (
    <>
      <ApolloWrapper>
        <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ApolloWrapper>
    </>
  );
};
