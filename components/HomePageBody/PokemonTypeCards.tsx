import { Paper } from "@mui/material";
import Image from "next/image";
import styles from "./styles/HomePageBody.module.css";
interface Props {
  type: string;
  id: number;
}
type types = {
  [key: string]: string;
};
const PokemonTypeCards = ({ type, id }: Props) => {
  const Types: types = {
    electric: "#F2D94E",
    bug: "#92BC2C",
    dark: "#595761",
    dragon: "#0C69C8",
    fairy: "#EE90E6",
    fighting: "#D3425F",
    fire: "#FBA54C",
    flying: "#A1BBEC",
    ghost: "#5F6DBC",
    grass: "#5FBD58",
    ground: "#DA7C4D",
    ice: "#75D0C1",
    normal: "#A0A29F",
    poison: "#B763CF",
    psychic: "#FA8581",
    steel: "#5695A3",
    water: "#539DDF",
    rock: "#C9BB8A",
  };
  return (
    <Paper
      key={`${id}/${type}`}
      sx={{
        backgroundColor: Types[type],
        color: Types[type],
        borderRadius: "100%",
        boxShadow: 20,
        transitionDuration: "200ms",
      }}
      className={styles.pokemonTypeCardsContainer}
    >
      <Image
        alt={`Icon for ${type} type`}
        src={`/types/${type}.svg`}
        height={20}
        width={20}
        style={{ height: "auto", width: "auto" }}
      />
    </Paper>
  );
};

export default PokemonTypeCards;
