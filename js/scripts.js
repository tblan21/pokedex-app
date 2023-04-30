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


  // this fetches the pokemon from the API
  function loadList () {
    return fetch(pokemonApiUrl).then (function (response){
      return response.json();
    }).then(function(json) {
        json.results.forEach(function(item){
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            type: item.types,
            image: item.imageUrl
          };
          add(pokemon);
        });
    }).catch (function (e) {
      console.log(e)
    })
  };

  // WIP: modal to show pokemon details
  function showModal(pokemon) {
    let pokemonContainer = document.querySelector('.pokemon-modal');

    pokemonContainer.innerHTML = '';

    let pokemonDetails = document.createElement('div');
    pokemonDetails.classList.add('pokemon-details');

    let closeButtonElement = document.createElement('button');

    closeButtonElement.classList.add('pokemon-details-close');
    closeButtonElement.innerText = 'Close';

    closeButtonElement.addEventListener('click', hidePokemonDetails);

    let titleElement = document.createElement('h1');
    titleElement.innerText = 'Name:' + ' ' + pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height:' + ' ' + pokemon.height;

    let pokemonType = document.createElement('p');
    pokemonType.innerText = 'Type:' + ' ' + pokemon.type;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.image;

    pokemonDetails.appendChild(closeButtonElement);
    pokemonDetails.appendChild(titleElement);
    pokemonDetails.appendChild(contentElement);
    pokemonDetails.appendChild(pokemonType);
    pokemonDetails.appendChild(pokemonImage);
    pokemonContainer.appendChild(pokemonDetails);

    pokemonContainer.classList.add('is-visible');
    
    pokemonContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === pokemonContainer) {
        hidePokemonDetails();
      }
    });
    }

  function loadDetails(item) {
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

  function showDetails(item) {
    loadDetails(item).then(function (){
      showModal(item);
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

  // let pokemonButton = document.querySelector('.pokemon-list__button');

  // pokemonButton.addEventListener('click', ()=>showDetails(pokemon, pokemon));
  
  // document.querySelector('.pokemon-list__button').addEventListener('click', () => {
  //   showDetails('title', 'content');
  // });

  function hidePokemonDetails() {
    let pokemonContainer = document.querySelector('.pokemon-modal');

    pokemonContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let pokemonContainer = document.querySelector('.pokemon-modal');
    if (e.key === 'Escape' && pokemonContainer.classList.contains('is-visible')) {
      hidePokemonDetails();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

pokemonRepository.loadList().then(function (){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})