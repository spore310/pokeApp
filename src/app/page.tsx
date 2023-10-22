"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PokeDex } from "../../lib/pokemonDatasource";
import Test from "../../components/test/test";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
export default function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Test />
      </ThemeProvider>
    </main>
  );
}
