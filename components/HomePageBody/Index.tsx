"use client";
import { Box, Stack, Typography, Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { PokeDex } from "../../lib/pokemonDatasource";
import styles from "./styles/HomePageBody.module.css";
import { use, useEffect, useRef, useState } from "react";
import { Props as pokeDexSearchProps } from "./PokeDexSearch";
const PokeDexSearch = dynamic(() => import("./PokeDexSearch"), {});
const HomePageBody = () => {
  const loadMoreRef = useRef(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const offset = searchParams.get("offset");
  const parsedOffset = parseInt(`${offset}`.trim());
  const parsedSearch = `${search}`.trim();
  const sanitizedOffset =
    !isNaN(parsedOffset) && !!(parsedOffset >= 0 && parsedOffset <= 1095);
  const [offSetCount, setOffSetCount] = useState<number>(
    sanitizedOffset ? parsedOffset : 0
  );
  const [offSetFlag, toogleOffSetFlag] = useState<boolean>(true);
  const [refetch, { data, loading, error }] = PokeDex.pokeDexSearch(
    ``,
    sanitizedOffset ? parsedOffset : 0
  );
  const [
    refetchLoadingData,
    {
      data: lazyData,
      loading: lazyLoadingState,
      error: lazyLoadingError,
      fetchMore,
    },
  ] = PokeDex.pokeDexLoadMoreSearch(``, sanitizedOffset ? parsedOffset : 0);
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (
      entries?.[0]?.target === loadMoreRef.current &&
      entries?.[0]?.isIntersecting === true
    ) {
      console.log("test47", offSetCount, entries?.[0]?.target);

      if (
        !!offSetFlag ||
        (lazyData?.["pokemon_v2_pokemon"]?.length > 0 && !offSetFlag)
      ) {
        setOffSetCount((prev) => prev + 10);
      }
    }
  };

  const refetchData = () => {
    refetch({
      variables: {
        search: parsedSearch,
        offset: sanitizedOffset ? parsedOffset : 0,
      },
    });
  };
  useEffect(() => {
    refetchData();
  }, [search]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => observerCallback(entries),
      { root: null, threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    console.log("hit", offSetCount);
    if (offSetCount === 0) {
      console.log("hit2");
      toogleOffSetFlag(false);
    }
    fetchMore({
      variables: {
        search: parsedSearch,
        offset: offSetCount,
      },
    });
  }, [offSetCount]);
  const pokemons = data?.["pokemon_v2_pokemon"];
  return (
    <Box
      className={styles.container}
      sx={{ border: "1px solid purple", overflowY: "scroll" }}
      component={"div"}
    >
      <Stack direction={"column"} alignItems={"center"} spacing={2}>
        {loading && "loadings"}
        {data && (
          <>
            {pokemons?.map((pokemon: pokeDexSearchProps) => {
              return <PokeDexSearch key={pokemon?.id} {...pokemon} />;
            })}
          </>
        )}

        <Box
          ref={loadMoreRef}
          sx={{
            position: "relative",
            top: 500,
          }}
        >
          {" "}
          <Typography variant="body1" component="p">
            Load more
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePageBody;
