import axios from "axios";
import { gql, useLazyQuery } from "@apollo/client";
export const POKEAPIDOMAINURL = "https://pokeapi.co/";
export const POKEGQLAPIDOMAINURL = "https://beta.pokeapi.co/graphql/v1beta";
export const POKEAPIIMAGEURLBASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png";
export const pokeDexSignal = new AbortController();
const pokeDex = axios.create({
  baseURL: POKEAPIDOMAINURL,
  signal: pokeDexSignal.signal,
});
// const apolloDriver = (query: DocumentNode, variables: any = "") => {
//   return useQuery(query, variables);
// };
class PokeDexClass {
  /**
   *Async function
   * @param {(string | number)} search - a number id or relative name of pokemon to search for
   * @returns a list of pokemon that matches the input by the user in the search field of the pokedex. Can return undefined
   */
  public searchPokemon = (search?: string) => {
    const query = gql`
      query searchPokemonGQL($search: String!) {
        pokemon_v2_pokemon(
          where: { name: { _iregex: $search }, id: { _lt: 1095 } }
          limit: 6
        ) {
          name
          id
        }
      }
    `;
    return useLazyQuery(query, {
      variables: { search },
    });

    // return await apolloDriver(`api/v2/pokemon/${search}`);
  };

  public pokeDexSearch = (search: string, offset: number) => {
    const query = gql`
      query searchPokemonParamsGQL($search: String!, $offset: Int!) {
        pokemon_v2_pokemon(
          where: { name: { _iregex: $search }, id: { _lt: 1095 } }
          limit: 50
          offset: $offset
        ) {
          name
          id
          height
          weight
          base_experience
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `;
    return useLazyQuery(query, {
      variables: { search, offset },
    });
  };
  public pokeDexLoadMoreSearch = (search: string, offset: number) => {
    const query = gql`
      query searchPokemonLoadMoreGQL($search: String!, $offset: Int!) {
        pokemon_v2_pokemon(
          where: { name: { _iregex: $search }, id: { _lt: 1095 } }
          limit: 10
          offset: $offset
        ) {
          name
          id
          height
          weight
          base_experience
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `;
    return useLazyQuery(query, {
      variables: { search, offset },
    });
  };
}
export const PokeDex = new PokeDexClass();
export default pokeDex;
