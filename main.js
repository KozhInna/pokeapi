const pokedex = document.querySelector(".container");

let pokeData = [1, 2, 3];

const fetchData = async () => {
  await fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
    .then((response) => response.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
            };
          });
      });
      Promise.all(fetches).then((res) => {
        pokeData = res;
        pokeCards();
        console.log(pokeData);
      });
    });
};

const pokeCards = () => {
  const cards = pokeData
    .map((pokemon) => {
      return `<div class="poke-card">
   <img class="poke-image" src="${pokemon.img}" />
   <p class="id">#1</p>
   <h2 class="poke-name">${pokemon.name}</h2>
   <div class="features">
     <p class="water feature">Water</p>
     <p class="poison feature">Poison</p>
     </div>
     </div>`;
    })
    .join("");
  pokedex.innerHTML = cards;
};

fetchData();
