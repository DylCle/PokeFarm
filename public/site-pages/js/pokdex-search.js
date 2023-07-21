const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocompleteList");

// Event listener for user input
searchInput.addEventListener("input", handleInput);

function handleInput() {
  const searchTerm = searchInput.value.trim();

  // Clear existing autocomplete suggestions
  autocompleteList.innerHTML = "";

  if (searchTerm !== "") {
    // Call the PokeAPI to retrieve a list of Pokemon names
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then(response => response.json())
      .then(data => {
        const pokemonList = data.results;

        // Filter the Pokemon names based on the searchTerm
        const matchingPokemon = pokemonList.filter(pokemon =>
          pokemon.name.startsWith(searchTerm.toLowerCase())
        );

        // Display autocomplete suggestions
        const maxSuggestions = Math.min(matchingPokemon.length, 12);
        for (let i = 0; i < maxSuggestions; i++) {
          const pokemon = matchingPokemon[i];
          const li = document.createElement("li");


          li.classList.add("autocomplete-item");
          li.innerHTML = `
            <img src="${getPokemonSprite(pokemon.url)}" alt="${pokemon.name}">
            <span>${(pokemon.name).charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
          `;

          li.addEventListener("click", () => {
            searchInput.value = pokemon.name
            displayInfo(pokemon.name)
            getEmeraldLocations(pokemon.name)
            autocompleteList.innerHTML = "";
          });
          autocompleteList.appendChild(li);
        }
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
}

function getPokemonSprite(pokemonUrl) {
  const pokemonId = pokemonUrl.split("/").splice(-2, 1)[0];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

function displayInfo(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
      let image = document.createElement('img');
      image.src = '';
      image.src = data.sprites.other["official-artwork"].front_default;
      image.alt = data.name;
      let imgContainer = document.getElementById('image-container');
      while (imgContainer.firstChild) {
        imgContainer.removeChild(imgContainer.firstChild);
      }
      imgContainer.appendChild(image);

    });
}

let versionName = 'firered';
function getEmeraldLocations(pkmn) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}/encounters`)
    .then(response => response.json())
    .then(data => {
      let inGames = [];
      const emeraldLocations = [];


      data.forEach(entry => {
        entry.version_details.forEach(versionDetail => {
          inGames.push(versionDetail.version.name);
          if (versionDetail.version.name === versionName) {
            emeraldLocations.push(entry.location_area.name.replace(/-/g, " "));
          } 
        });
      });

      const gameSelect = document.getElementById('games-select');
      gameSelect.innerHTML = '';
      const wordsToRemove = ["Hoenn", "Area", "Johto", "Kanto"];
      const regex = new RegExp('\\b\\s*(' + wordsToRemove.join("|") + ')\\s*\\b', 'gi');
      const formattedLocations = emeraldLocations.map(location =>
        location.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      ).join(", ");
      const container = document.getElementById('data');   
      const existingParagraph = container.querySelector('li');
      if (existingParagraph) {
        container.removeChild(existingParagraph);
      }
      const paragraph = document.createElement('li');;
      const modifiedLocations = formattedLocations.replace(regex, '');
      const textNode = document.createTextNode(modifiedLocations);
      const uniqueInGames = inGames.filter((item, index) => inGames.indexOf(item) === index);

      uniqueInGames.forEach((item) => {
        let linkElement = document.createElement('a');

        linkElement.href = '#';
        linkElement.textContent = item.charAt(0).toUpperCase() + item.slice(1) + ", ";
        gameSelect.appendChild(linkElement);
        linkElement.addEventListener('click', function () {
          // When the link is clicked, store the version name in the 'inGames' array
          versionName = item
          console.log(`Version Name "${versionName}" is stored in inGames array.`);
          // You can use 'inGames' array for further processing or display
          getEmeraldLocations(pkmn);
        });


      })


      paragraph.appendChild(textNode);
      container.appendChild(paragraph);



      return modifiedLocations; // Return the modified locations
    })
    .catch(error => {
      console.log("Error:", error);
      return [];
    });
}
