"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ApolloWrapper } from "../../components/ApolloWrapper/ApolloWrapper";
import { ReduxProviders } from "../redux/provider";
import { usePokeAppSelector } from "../redux/Hooks";
import { useEffect } from "react";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = usePokeAppSelector((state) => state.theme.themeMode.mode);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      success: {
        main: "#4fe3e1",
      },
      background: {
        default: "#F5F5DC",
      },
    },
    typography: {},
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
            backgroundColor: "#4fe3e1",
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

  return (
    <>
      <ApolloWrapper>
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ApolloWrapper>
    </>
  );
};
