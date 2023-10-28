export interface pokemon {
  id: number;
  name?: string;
  order?: number;
  pokemon_v2_pokemonsprites: pokemonSpritesGraphQL[];
}

export interface pokemonSpritesGraphQL {
  sprites: string;
}
