"use client";
import Image from "next/image";
import styles from "./styles/test.module.css";
import { POKEAPIDOMAINURL, PokeDex } from "../../lib/pokemonDatasource";
import { upperCaseString } from "../../lib/lib";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
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
  const LoadingCard = (): React.ReactNode => (
    <div className={styles.listCard}>{"loading"}</div>
  );

  const pokemon = data?.["pokemon_v2_pokemon"]?.map((pokemon: any) => {
    const name = upperCaseString(pokemon?.name);
    return (
      <li key={`${pokemon?.id}`} className={styles.listCard}>
        <p id={`${name}`}>{`${name}`}</p>

        <Image
          alt={`photo of ${pokemon?.name}`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
          quality={100}
          height={45}
          width={50}
        />
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={nameSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async (values: Values, { setSubmitting }) => {
          router.replace(`/?search=${values.search}`);
          console.log(values);
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.searchBarContainer}>
              <Field
                name="search"
                id="search"
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  toggleSuggestion(false)
                }
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                  toggleSuggestion(true)
                }
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
                maxLength={30}
                min={0}
              />
              <button className={styles.submitButton} type="submit">
                {isSubmitting ? "loading..." : "Search"}
              </button>
            </div>
            <ul id="searchBar" className={styles.list}>
              {showSuggestion && !loading ? pokemon : null}
              {loading && <LoadingCard />}
            </ul>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Test;
