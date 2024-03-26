import { Paper } from "@mui/material";
import Image from "next/image";
interface Props {
  type: string;
  key: number;
}
const types = {
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
};
const PokemonTypeCards = ({ type, key }: Props) => {
  return (
    <Paper key={key}>
      <Image
        placeholder="blur"
        alt={`Icon for ${type} type`}
        src={`/types/${type}.svg`}
        style={{ height: "auto", width: "auto" }}
      />
    </Paper>
  );
};

export default PokemonTypeCards;
