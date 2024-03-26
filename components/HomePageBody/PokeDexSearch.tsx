import { Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./styles/HomePageBody.module.css";
import PokemonTypeCards from "./PokemonTypeCards";
interface Props {
  name: string;
  order: number;
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  pokemon_v2_pokemontypes: PokemonTypeArray[];
}
interface PokemonTypeArray {
  pokemon_v2_type: PokemonType;
}
interface PokemonType {
  name: string;
}
const PokeDexSearch = ({
  name,
  id,
  height,
  weight,
  pokemon_v2_pokemontypes,
}: Props) => {
  const types: string[] = pokemon_v2_pokemontypes.map(
    (type) => type["pokemon_v2_type"].name
  );
  return (
    <Card key={id}>
      <Stack direction={"row"} spacing={3}>
        <Image
          alt={`Photo of ${name}`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        <Stack direction={"column"} spacing={2}>
          <Typography variant={"h2"} component={"h3"}>
            {name}
          </Typography>

          <Typography variant={"body1"} component={"p"}>
            {`${((weight / 10) * 2.205).toFixed(2)} kgs ${(weight / 10).toFixed(
              2
            )} lbs`}
          </Typography>
          <Typography variant={"body1"} component={"p"}>
            {`${(height / 10).toFixed(2)} m ${(height / 3.048).toFixed(2)} ft`}
          </Typography>
          <Stack direction={"row"} spacing={1}>
            {types.map((type) => (
              <PokemonTypeCards key={id} type={type} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PokeDexSearch;
