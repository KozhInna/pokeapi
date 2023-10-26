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

searchBar.addEventListener("keyup", (e) => {
  const searchQuery = e.target.value.toLowerCase();

  const filteredQuery = pokeData.filter((item) => {
    return (
      item.types
        .map((item) => item.type.name)
        .join("")
        .includes(searchQuery) || item.name.toLowerCase().includes(searchQuery)
    );
  });

  pokeCards(filteredQuery);
});

const fetchData = async (gen) => {
  const res = await fetch(`https://pokeapi.co/api/v2/generation/${gen}/`);
  const data = await res.json();

  textUnderGens.textContent = `There are ${data.pokemon_species.length} pokemons in generation ${gen}`;

  const fetches = data.pokemon_species.map(async function (item) {
    const res = await fetch(item.url);
    const data = await res.json();

    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/`);
    const data2 = await res2.json();

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
    pokeData = res.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log(pokeData);
    pokeCards(pokeData);
  });
};

const pokeCards = (pokeData) => {
  const type = "grass";
  const cards = pokeData

    .map((pokemon) => {
      return `<div class="poke-card">
   <img class="poke-image" src="${pokemon.img}" />
   <p class="id">${pokemon.id}</p>
   <h2 class="poke-name">${pokemon.name}</h2>
 <div class="type">
    ${pokemon.types
      .map(
        (item) =>
          `<img class="type-img" src="img/${item.type.name}_type.ico" />`
      )
      .join("")}
      </div>
      
   
    
   <div class="features">
     <p class="height feature">${pokemon.height * 10} cm</p>
     <p class="weight feature">${pokemon.weight / 10} kg</p>
     </div>
     </div>`;
    })
    .join("");
  content.innerHTML = cards;
};

function genActivation() {
  searchBar.style.display = "inline-block";
  content.style.display = "grid";
  searchBar.value = "";
}
btn1.addEventListener("click", function () {
  fetchData(1);
  genActivation();
});
btn2.addEventListener("click", function () {
  fetchData(2);
  genActivation();
});
btn3.addEventListener("click", function () {
  fetchData(3);
  genActivation();
});
btn4.addEventListener("click", function () {
  fetchData(4);
  genActivation();
});
btn5.addEventListener("click", function () {
  fetchData(5);
  genActivation();
});
btn6.addEventListener("click", function () {
  fetchData(6);
  genActivation();
});
btn7.addEventListener("click", function () {
  fetchData(7);
  genActivation();
});
btn8.addEventListener("click", function () {
  fetchData(8);
  genActivation();
});
