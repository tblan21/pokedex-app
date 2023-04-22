// this wraps the code in an IIFE to avoid accidentally accessing a global state
let pokemonRepository = (function () {
  
  // list of pokemon with their heights and types 
  let pokemonList = [
    { name: 'Alakazam', height: 1.5, type: 'psychic'},
    { name: 'Tauros', height: 1.4, type:'normal'},
    { name: 'Clefairy', height: 0.6, type: 'fairy'},
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']}
];

// the below code writes each pokemon in the list along with its height

function listPokemons(pokemon){
  document.write(pokemon.name + " " + pokemon.height + " " + pokemon.type + " " + '<br>')
  
  // the below conditional highlights the tallest pokemon
  if (pokemon.height > 1.4){
    document.write('Wow, that\'s big!' + '<br>');
  }
}

pokemonList.forEach(listPokemons);
  
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();