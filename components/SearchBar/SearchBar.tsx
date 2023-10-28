"use client";
import Image from "next/image";
import styles from "./styles/test.module.css";
import { PokeDex } from "../../lib/pokemonDatasource";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { Paper, TextField, Box, Stack, Divider, Card } from "@mui/material";
import { SearchBarSuggestionItem } from "./SearchBarSuggestionItem";
import { pokemon } from "../../lib/types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import pokeballImage from "@/../public/pokeball.png";
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

const SearchBar = () => {
  const [showSuggestion, toggleSuggestion] = useState<boolean>(false);
  const router = useRouter();
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

  // const pokemon = data?.["pokemon_v2_pokemon"]?.map((pokemon: pokemon) => {
  //   if (!pokemon?.name) return;
  //   return (
  //     <SearchBarSuggestionItem
  //       key={pokemon.id}
  //       toogleSuggestion={toggleSuggestion}
  //       pokemon={pokemon}
  //     />
  //   );
  // });

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
            className={styles.form}
            tabIndex={-1}
            name="Pokedex search bar"
            aria-label="Pokedex search bar container"
          >
            <div className={styles.searchBarContainer}>
              <TextField
                name="search"
                id="searchField"
                autoComplete="off"
                aria-label="pokedex search field"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleOnChange(e, setFieldValue);
                }}
                color={"secondary"}
                InputProps={{
                  endAdornment: (
                    <Stack
                      direction={"row"}
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                      flexShrink={0}
                    >
                      <button className={styles.submitButton} type="submit">
                        {
                          <Image
                            src={pokeballImage}
                            alt={"small pokeball picture"}
                            className={
                              isSubmitting
                                ? styles.searchImageRotate
                                : styles.searchImage
                            }
                            height={24}
                            width={24}
                          />
                        }
                      </button>
                      {!!showSuggestion && (
                        <button
                          onClick={() => toggleSuggestion((prev) => !prev)}
                        >
                          <CloseOutlinedIcon color={"secondary"} />
                        </button>
                      )}
                    </Stack>
                  ),
                }}
              />
            </div>
            <Box
              id="searchBar"
              component="ul"
              aria-label="search results for typed in input"
              className={styles.list}
              sx={{ width: 350 }}
            >
              {showSuggestion &&
              !loading &&
              data?.["pokemon_v2_pokemon"]?.length > 0 ? (
                data?.["pokemon_v2_pokemon"]?.map((pokemon: pokemon) => {
                  if (!pokemon?.name) return;
                  return (
                    <SearchBarSuggestionItem
                      key={pokemon.id}
                      toogleSuggestion={toggleSuggestion}
                      setNewValue={setFieldValue}
                      reset={async () => {
                        resetForm();
                        await refetch({ variables: { search: pokemon?.name } });
                      }}
                      pokemon={pokemon}
                    />
                  );
                })
              ) : loading && showSuggestion ? (
                <li className={styles.loadingSuggestionContainer}>
                  <AutorenewOutlinedIcon
                    aria-label="loading suggestion results"
                    aria-role="status"
                    color="secondary"
                    className={styles.suggestionLoading}
                  />
                </li>
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

export default SearchBar;
