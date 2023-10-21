import axios from "axios";
import { getClient } from "./apollo/client";
import { DocumentNode, gql, useLazyQuery, useQuery } from "@apollo/client";

export const POKEAPIDOMAINURL = "https://pokeapi.co/";
export const POKEGQLAPIDOMAINURL = "https://beta.pokeapi.co/graphql/v1beta";
export const POKEAPIIMAGEURLBASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png";
export const pokeDexSignal = new AbortController();
const pokeDex = axios.create({
  baseURL: POKEAPIDOMAINURL,
  signal: pokeDexSignal.signal,
});
const apolloDriver = (query: DocumentNode, variables: any = "") => {
  return useQuery(query, variables);
};
class PokeDexClass {
  /**
   *Async function
   * returns a list of pokemon that matches the input by the user in the search field of the pokedex. Can return undefined
   * @param {(string | number)} search - a number id or relative name of pokemon to search for
   * @returns
   */
  public searchPokemon = (search: string) => {
    const query = gql`
      query searchPokemonGQL($search: String!) {
        pokemon_v2_pokemon(
          where: { name: { _iregex: $search }, id: { _lt: 1095 } }
          limit: 6
        ) {
          name
          order
          id
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }
    `;
    return useLazyQuery(query, {
      variables: { search: search },
    });

    // return await apolloDriver(`api/v2/pokemon/${search}`);
  };

  public getPokemonForm = async (search: string | number) => {
    if (typeof search === "string" && search.trim() === "") {
      return;
    }
    // return await apolloDriver(`api/v2/pokemon-form/${search}`);
  };
}
export const PokeDex = new PokeDexClass();
export default pokeDex;
