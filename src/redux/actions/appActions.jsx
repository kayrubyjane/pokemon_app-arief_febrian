import axios from 'axios';
import {
  GET_POKEMON,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_FAILED,
  GET_POKEMON_DETAIL,
  GET_POKEMON_DETAIL_SUCCESS,
  GET_POKEMON_DETAIL_FAILED,
  COMPARE_POKEMON,
  COMPARE_POKEMON_SUCCESS,
  COMPARE_POKEMON_FAILED
} from '../types/actionTypes';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const BASE_IMAGE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

export const fetchPokemonAction = limit => async dispatch => {
  dispatch({type: GET_POKEMON});
  try {
    const response = await axios.get(`${BASE_URL}?offset=0&limit=${limit}`);
    if (response.status >= 200 && response.status < 300) {
      const {results} = response.data;
      const pokemonData = results.map(pokemon => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return {
          id: id,
          image: BASE_IMAGE_URL + id + '.png',
          name: pokemon.name,
        };
      });
      dispatch({
        type: GET_POKEMON_SUCCESS,
        payload: pokemonData,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_POKEMON_FAILED,
      error: error.message,
    });
  }
};

export const fetchPokemonDetail = id => async dispatch => {
  dispatch({type: GET_POKEMON_DETAIL});
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;

      const pokemonDetail = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        dreamWorldImage: data.sprites.other['dream_world'].front_default,
        weight: data.weight,
        height: data.height,
        types: data.types.map(typeData => typeData.type.name),
        stats: data.stats.map(statData => ({
          name: statData.stat.name,
          base_stat: statData.base_stat,
        })),
        abilities: await Promise.all(
          data.abilities.map(async abilityData => {
            if (!abilityData.ability || !abilityData.ability.url) {
              return { name: 'Unknown', effect: 'No effect description available' };
            }
        
            try {
              const abilityResponse = await axios.get(abilityData.ability.url);
              const abilityDetails = abilityResponse.data;
        
              return {
                name: abilityData.ability.name,
                effect:
                  abilityDetails.effect_entries.find(
                    entry => entry.language.name === 'en',
                  )?.effect || 'No effect description available',
              };
            } catch (err) {
              return {
                name: abilityData.ability.name,
                effect: 'Error fetching ability details',
              };
            }
          }),
        ),        
      };

      dispatch({
        type: GET_POKEMON_DETAIL_SUCCESS,
        payload: pokemonDetail,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_POKEMON_DETAIL_FAILED,
      error: error.message,
    });
  }
};

export const comparePokemon = (pokemonIds) => async (dispatch) => {
  dispatch({ type: COMPARE_POKEMON });
  try {
    const compareData = await Promise.all(
      pokemonIds.map(async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            stats: data.stats.map((statData) => ({
              name: statData.stat.name,
              base_stat: statData.base_stat,
            })),
          };
        }
        throw new Error(`Failed to fetch Pokémon with ID ${id}`);
      })
    );

    dispatch({
      type: COMPARE_POKEMON_SUCCESS,
      payload: compareData,
    });
  } catch (error) {
    dispatch({
      type: COMPARE_POKEMON_FAILED,
      error: error.message,
    });
  }
};
