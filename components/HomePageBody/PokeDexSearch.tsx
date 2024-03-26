import { Card, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./styles/HomePageBody.module.css";
import PokemonTypeCards from "./PokemonTypeCards";
import { upperCaseString } from "../../lib/lib";
export interface Props {
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
  const loaderProp = ({ src }: any) => {
    return src;
  };
  return (
    <Card
      key={`${id}/${name}`}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "#8f8f8f"
            : theme.palette.background.paper,
      }}
      className={styles.pokeDexSearchContainer}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Image
          className={styles.pokeDexSearchImage}
          alt={`Photo of ${name}`}
          loader={loaderProp}
          width={75}
          height={50}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ paddingBottom: 2 }}
          spacing={2}
        >
          <Typography variant={"h4"} noWrap component={"h3"}>
            {upperCaseString(name)}
          </Typography>

          <Paper elevation={3} className={styles.pokeDexSearchTypo}>
            <Typography variant={"body1"} component={"p"}>
              {`${((weight / 10) * 2.205).toFixed(2)} kgs`}{" "}
              {`${(weight / 10).toFixed(2)} lbs`}
            </Typography>
          </Paper>
          <Paper elevation={3} className={styles.pokeDexSearchTypo}>
            <Typography variant={"body1"} component={"p"}>
              {`${(height / 10).toFixed(2)} m  ${(height / 3.048).toFixed(
                2
              )} ft`}
            </Typography>
          </Paper>
        </Stack>
        <Stack
          direction={"row"}
          className={styles.pokemonTypeCardsStack}
          alignItems={"center"}
          spacing={1}
        >
          {types.map((type) => (
            <PokemonTypeCards key={id} id={id} type={type} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default PokeDexSearch;
