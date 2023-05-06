// this wraps the code in an IIFE to avoid accidentally accessing a global state
let pokemonRepository = (function () {

// this is the pokemon API containing 150 pokemon
  let pokemonList = [];
  let pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
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

  // this creates list items with buttons and added pokemon's names to button
  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');

    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    })

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

  // this returns each pokemon's details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      showModal(item);
    }).catch (function (e){
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon)
  }

  // Modal to show pokemon details
  function showModal(pokemon) {
    // NEW MODAL: With bootstrap
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerText = pokemon.name;

    let pokemonImage = document.querySelector('.pokemon-image');
    pokemonImage.src = pokemon.imageUrl;

    let pokemonHeight = document.querySelector('.pokemon-height');
    pokemonHeight.innerText = 'Height: ' + (pokemon.height/10) + ' m';

    let pokemonType = document.querySelector('.pokemon-type');
    pokemonType.innerText = pokemon.types.map(item =>{
      return item.type.name;
      }).toString();

  }  

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function (){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})