const getPokemons = () => {
  fetch(`https://pokeapi.co/api/v2/generation/1/`)
    .then((response) => response.json())
    .then((data) => console.log(data));
  //.then((data) => data.url.filter()
};
getPokemons();
