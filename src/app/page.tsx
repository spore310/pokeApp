"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AppBar } from "../../components/AppBar/AppBar";
export default function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-100">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar />
      </ThemeProvider>
    </main>
  );
}
