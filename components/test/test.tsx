"use client";
import Image from "next/image";
import styles from "./styles/test.module.css";
import { PokeDex } from "../../lib/pokemonDatasource";
import { upperCaseString } from "../../lib/lib";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Paper, TextField, Card, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
interface Values {
  search: string;
}
const nameSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(0)
    .max(30, "too many characters")
    .matches(/[A-Za-z \-]/, "Does not match format"),
});

const Test = () => {
  const [showSuggestion, toggleSuggestion] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const [refetch, { data, loading, error }] = PokeDex.searchPokemon(" ");
  const handleOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const value = e?.target?.value.trim();
    setFieldValue(e.target.name, value);
    if (value === "") {
      toggleSuggestion(false);
      return;
    }
    toggleSuggestion(true);
    await refetch({ variables: { search: value } });
  };

  const pokemon = data?.["pokemon_v2_pokemon"]?.map((pokemon: any) => {
    if (!pokemon?.name) return;
    const name = upperCaseString(pokemon?.name);
    return (
      <Card
        key={`${pokemon?.id}`}
        className={styles.listCard}
        variant="outlined"
        color={"primary"}
        component="li"
        onClick={(e) => {
          router.push(`/?search=${pokemon?.name}`);
        }}
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.text.secondary,
          },
        }}
      >
        <Typography
          variant="body2"
          component="p"
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
          width={50}
        />
      </Card>
    );
  });

  return (
    <Paper component="div" elevation={8} className={styles.container}>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={nameSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async (values: Values, { setSubmitting }) => {
          router.replace(`/${values.search ? `?search=${values.search}` : ``}`);
        }}
      >
        {({
          errors,
          touched,
          values,
          setFieldValue,
          isSubmitting,
          resetForm,
        }) => (
          <Form
            onBlur={(e) => {
              setTimeout(() => toggleSuggestion(false), 100);
            }}
            className={styles.form}
          >
            <div className={styles.searchBarContainer}>
              <TextField
                name="search"
                id="searchField"
                autoComplete="off"
                aria-autocomplete="none"
                variant="standard"
                value={values.search}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  toggleSuggestion(true);
                }}
                className={
                  errors.search
                    ? styles.searchBarError
                    : touched.search
                    ? styles.searchBarTouched
                    : styles.searchBar
                }
                placeholder="Search pokemon"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, setFieldValue)
                }
                color={"secondary"}
                InputProps={{
                  endAdornment: (
                    <button className={styles.submitButton} type="submit">
                      {
                        <Image
                          src={"/pokeball-small.png"}
                          alt={"small pokeball.png"}
                          className={
                            isSubmitting
                              ? styles.searchImageRotate
                              : styles.searchImage
                          }
                          height={50}
                          width={50}
                        />
                      }
                    </button>
                  ),
                }}
              />
            </div>
            <Box
              id="searchBar"
              component="ul"
              className={styles.list}
              sx={{ width: 350 }}
            >
              {showSuggestion && !loading && pokemon?.length > 0 ? (
                pokemon
              ) : loading && showSuggestion ? (
                <Typography
                  variant="body1"
                  component="span"
                  align="center"
                  noWrap
                >
                  {"loading..."}
                </Typography>
              ) : error?.message ? (
                "error"
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default Test;
