// this wraps the code in an IIFE to avoid accidentally accessing a global state
let pokemonRepository = (function () {

// this is the pokemon API containing 150 pokemon
  let pokemonList = [];
  let pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function addListItem(pokemon) {
    // created list items with buttons and added pokemon's names to button
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;

    button.classList.add('pokemon-list__button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    
    button.addEventListener('click', ()=>showDetails(pokemon));
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then (function() {
      console.log(pokemon);
    });
  }

  // this adds each pokemon to the list IF:
  // the pokemon is an object and has a name and details, ELSE:
  // the console logs an error
  function add(pokemon){
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else{
      console.log('pokemon is not correct')
    }
  }

  function getAll() {
    return pokemonList;
  }

// this fetches the pokemon from the API
  function loadList () {
    return fetch(pokemonApiUrl).then (function (response){
      return response.json();
    }).then(function(json) {
        json.results.forEach(function(item){
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
    }).catch (function (e) {
      console.log(e)
    })
  };

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch (function (e){
      console.error(e);
    });
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function (){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})