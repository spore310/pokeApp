"use client";
import { Box, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { PokeDex } from "../../lib/pokemonDatasource";
import styles from "./styles/HomePageBody.module.css";
import { useEffect } from "react";

const HomePageBody = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const offset = searchParams.get("offset");
  const parsedOffset = parseInt(`${offset}`.trim());
  const parsedSearch = `${search}`.trim();
  const sanitizedOffset =
    !isNaN(parsedOffset) && !!(parsedOffset >= 0 && parsedOffset <= 1095);
  const [refetch, { data, loading, error }] = PokeDex.pokeDexSearch(
    ``,
    sanitizedOffset ? parsedOffset : 0
  );
  const refetchData = () =>
    refetch({
      variables: {
        search: parsedSearch,
        offset: sanitizedOffset ? parsedOffset : 0,
      },
    });
  useEffect(() => {
    console.log(search);
    refetchData();
  }, [search]);
  useEffect(() => {
    console.log(search, "search");
    refetchData();
  }, []);
  const pokemons = data?.["pokemon_v2_pokemon"];
  return (
    <Box
      className={styles.container}
      sx={{ border: "1px solid purple" }}
      onClick={() =>
        refetch({
          variables: {
            search: parsedSearch,
            offset: sanitizedOffset ? parsedOffset : 0,
          },
        })
      }
      component={"div"}
    >
      <Stack direction={"column"} spacing={2}>
        {loading && "loading"}
        {data && "true"}
      </Stack>
    </Box>
  );
};

export default HomePageBody;
