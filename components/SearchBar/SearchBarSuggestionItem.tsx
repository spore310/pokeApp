"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Card, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { upperCaseString } from "../../lib/lib";
import styles from "./styles/searchBarSuggestionItem.module.css";
import { pokemon } from "../../lib/types";
interface Props {
  pokemon: pokemon;
  toogleSuggestion: Dispatch<SetStateAction<boolean>>;
  setNewValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  reset: () => void;
}
export const SearchBarSuggestionItem = ({
  pokemon,
  toogleSuggestion,

  reset,
}: Props) => {
  const router = useRouter();
  const handlePokemonSelection = async () => {
    reset();
    toogleSuggestion((prev) => !prev);
    router.push(`/?search=${pokemon?.name}`);
  };
  const name = upperCaseString(pokemon?.name);
  const loaderProp = ({ src }: any) => {
    return src;
  };
  return (
    <Card
      key={`${pokemon?.id}//${name}`}
      className={styles.listCard}
      variant="outlined"
      aria-label={`Suggestion list item for ${name} `}
      color={"primary"}
      component="li"
      tabIndex={0}
      onClick={() => {
        handlePokemonSelection();
      }}
      onKeyDown={(e) => {
        console.log(e.key);
        if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ") {
          handlePokemonSelection();
        }
      }}
      sx={{
        "&:hover": {
          backgroundColor: (theme) => theme.palette.text.secondary,
        },
      }}
    >
      <Typography
        variant="body2"
        component="p"
        aria-label={name}
        className={styles.pokeName}
        noWrap
      >
        {name}
      </Typography>

      <Image
        alt={`photo of ${pokemon?.name}`}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
        quality={100}
        height={45}
        loader={loaderProp}
        width={50}
      />
    </Card>
  );
};
