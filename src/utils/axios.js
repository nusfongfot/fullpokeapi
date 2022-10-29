import axios from 'axios'

//function create new axios
const createAxios = (baseUrl) =>
  axios.create({
    baseURL: baseUrl
  });

const pokemonApiV2 = createAxios('https://pokeapi.co/api/v2/')


export { pokemonApiV2 }

