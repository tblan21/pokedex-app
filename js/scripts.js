// list of pokemon with their heights and types 

let pokemonList=[
    { name: 'Alakazam', height: 1.5, type: 'psychic'},
    { name: 'Tauros', height: 1.4, type:'normal'},
    { name: 'Clefairy', height: 0.6, type: 'fairy'},
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']}
];

// the below code writes each pokemon in the list along with its height

let text1 = "  ";

for (let i = 0; i < pokemonList.length; i++){
  document.write(pokemonList[i].name + text1 + pokemonList[i].height + text1);
  // the below conditional highlights the tallest pokemon
  if (pokemonList[i].height > 1.4){
    document.write('Wow, that\'s big!' + text1);
  }
}