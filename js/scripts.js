// this wraps the code in an IIFE to avoid accidentally accessing a global state
let pokemonRepository = (function () {
  
  // list of pokemon with their heights and types 
  let pokemonList = [
    { name: 'Alakazam', height: 1.5, type: 'psychic'},
    { name: 'Tauros', height: 1.4, type:'normal'},
    { name: 'Clefairy', height: 0.6, type: 'fairy'},
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']}
  ];

// the below function writes each pokemon in the list along with its height
  
  function addListItem(pokemon) {
    // created list items with buttons and added pokemon's names to button
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;

    button.classList.add('pokemon-list__button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    
  }
}

  pokemonList.forEach(addListItem);

  
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    },
    addListItem: addListItem
  };
})();