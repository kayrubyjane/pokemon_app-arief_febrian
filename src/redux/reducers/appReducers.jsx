import {
  GET_POKEMON,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_FAILED,
  GET_POKEMON_DETAIL,
  GET_POKEMON_DETAIL_SUCCESS,
  GET_POKEMON_DETAIL_FAILED,
  COMPARE_POKEMON,
  COMPARE_POKEMON_SUCCESS,
  COMPARE_POKEMON_FAILED,
} from '../types/actionTypes';

const initialState = {
  pokemon: [],
  pokemonDetail: [],
  compareResult: [],
  loading: false,
  loadingDetail: false,
  loadingCompare: false,
  error: null,
  errorDetail: null,
  errorCompare: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {...state, loading: true, error: null};
    case GET_POKEMON_SUCCESS:
      return {...state, loading: false, pokemon: action.payload, error: null};
    case GET_POKEMON_FAILED:
      return {...state, loading: false, error: action.error};
    case GET_POKEMON_DETAIL:
      return {...state, loadingDetail: true, errorDetail: null};
    case GET_POKEMON_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        pokemonDetail: action.payload,
        errorDetail: null,
      };
    case GET_POKEMON_DETAIL_FAILED:
      return {...state, loadingDetail: false, errorDetail: action.error};
    case COMPARE_POKEMON:
      return {...state, loadingCompare: true, errorCompare: null};
    case COMPARE_POKEMON_SUCCESS:
      return {
        ...state,
        loadingCompare: false,
        compareResult: action.payload,
        errorCompare: null,
      };
    case COMPARE_POKEMON_FAILED:
      return {...state, loadingCompare: false, errorCompare: action.error};
    default:
      return state;
  }
};

export default appReducer;
