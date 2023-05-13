let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t&&"detailsUrl"in t?e.push(t):console.log("pokemon is not correct")}function n(){return e}function o(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,r(e)}).catch(function(e){console.error(e)})}function i(e){o(e)}function r(e){document.querySelector(".modal-title").innerText=e.name;document.querySelector(".pokemon-image").src=e.imageUrl;document.querySelector(".pokemon-height").innerText="Height: "+e.height/10+" m";document.querySelector(".pokemon-type").innerText=e.types.map(e=>e.type.name).toString()}let a=document.querySelector("#search-input");return a.addEventListener("input",function(){pokemonRepository.searchPokemon(a)}),{add:t,getAll:n,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("list-group-item");let r=document.createElement("button");r.innerText=t.name,r.classList.add("pokemon-item"),r.classList.add("btn"),r.classList.add("btn-light"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#exampleModal"),i.appendChild(r),n.appendChild(i),r.addEventListener("click",function(e){var n;n=t,o(n)})},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){t({name:e.name,detailsUrl:e.url,height:e.height,type:e.types,image:e.imageUrl})})}).catch(function(e){console.log(e)})},loadDetails:o,showDetails:i,showModal:r,searchPokemon:function t(n){let o=n.value.toLowerCase(),i=e.filter(function(e){return e.name.toLowerCase().indexOf(o)>-1});document.querySelector(".pokemon-list").innerHTML="",i.forEach(function(e){pokemonRepository.addListItem(e)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});