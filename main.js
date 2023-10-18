const content = document.querySelector(".pokedex");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");
const btn5 = document.querySelector(".btn5");
const btn6 = document.querySelector(".btn6");
const btn7 = document.querySelector(".btn7");
const btn8 = document.querySelector(".btn8");

const searchBar = document.querySelector("#searchBar");
const textUnderGens = document.querySelector(".textUnderGens");

let pokeData = [];
///////

// const fetchData = async () => {
//   await fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const fetches = data.results.map((item) => {
//         return fetch(item.url)
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             return {
//               id: data.id,
//               name: data.name,
//               img: data.sprites.other["official-artwork"].front_default,
//               types: data.types,
//               height: data.height,
//               weight: data.weight,
//             };
//           });
//       });
//       Promise.all(fetches).then((res) => {
//         pokeData = res;
//         /* console.log(res); */
//         pokeCards();
//         /* console.log(data.id); */
//       });
//     });
// };

// const pokeCards = () => {
//   const cards = pokeData

//     .map((pokemon) => {
//       /*       function loadTypes() {
//         let type = "";
//         const types = pokemon.types.map((item) => item.type.name);
//         console.log(types);
//         for (let i = 0; i < types.length; i++) {
//           type = `img/${types[i]}_type.ico`;
//         }
//       } */

//       return `<div class="poke-card">
//    <img class="poke-image" src="${pokemon.img}" />
//    <p class="id">${pokemon.id}</p>
//    <h2 class="poke-name">${pokemon.name}</h2>
//   <h2 class="type">${pokemon.types
//     .map((item) => item.type.name)
//     .join(", ")}</h2>
//    <div class="features">
//      <p class="height feature">${pokemon.height} cm</p>
//      <p class="weight feature">${pokemon.weight} kg</p>
//      </div>
//      </div>`;
//     })
//     .join("");
//   content.innerHTML = cards;
// };

// fetchData();

//*******pokemons by generation

/* const search = function () {
  const name = query;
  if (data2.name === name) {
  }
}; */

searchBar.addEventListener("keyup", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filteredQuery = pokeData.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery);
  });

  pokeCards(filteredQuery);
});

const fetchData = async (gen) => {
  const res = await fetch(`https://pokeapi.co/api/v2/generation/${gen}/`);
  const data = await res.json();

  textUnderGens.textContent = `There are ${data.pokemon_species.length} pokemons in generation ${gen}`;
  /* console.log(data.pokemon_species.length); */

  const fetches = data.pokemon_species.map(async function (item) {
    const res = await fetch(item.url);
    const data = await res.json();
    /* console.log(data.id); */

    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/`);
    const data2 = await res2.json();
    /* console.log(data2); */
    return {
      id: data2.id,
      name: data2.name,
      img: data2.sprites.other["official-artwork"].front_default,
      types: data2.types,
      height: data2.height,
      weight: data2.weight,
    };
  });
  Promise.all(fetches).then((res) => {
    pokeData = res;
    /* console.log(pokeData); */
    pokeCards(pokeData);
    /* console.log(pokeData.type); */
  });
};

const pokeCards = (pokeData) => {
  const cards = pokeData

    .map((pokemon) => {
      return `<div class="poke-card">
   <img class="poke-image" src="${pokemon.img}" />
   <p class="id">${pokemon.id}</p>
   <h2 class="poke-name">${pokemon.name}</h2>
  <h2 class="type">${pokemon.types
    .map((item) => item.type.name)
    .join(", ")}</h2>
   <div class="features">
     <p class="height feature">${pokemon.height} cm</p>
     <p class="weight feature">${pokemon.weight} kg</p>
     </div>
     </div>`;
    })
    .join("");
  content.innerHTML = cards;
};

btn1.addEventListener("click", function () {
  fetchData(1);
  searchBar.style.display = "inline-block";
  content.style.display = "grid";
});
btn2.addEventListener("click", function () {
  fetchData(2);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
btn3.addEventListener("click", function () {
  fetchData(3);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
btn4.addEventListener("click", function () {
  fetchData(4);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
btn5.addEventListener("click", function () {
  fetchData(5);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
btn6.addEventListener("click", function () {
  fetchData(6);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
btn7.addEventListener("click", function () {
  fetchData(7);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
btn8.addEventListener("click", function () {
  fetchData(8);
  content.style.display = "grid";
  searchBar.style.display = "inline-block";
});
