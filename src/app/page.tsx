"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PokeDex } from "../../lib/pokemonDatasource";
import Test from "../../components/test/test";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Test />
    </main>
  );
}
