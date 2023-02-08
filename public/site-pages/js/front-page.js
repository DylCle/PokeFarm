// const linkToImg = 'https://pokeapi.co/api/v2/pokemon/bagon';
// const name = 

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
fetch('http://192.168.2.35:3000/voted')
.then((response) => response.json())
.then(data => {
    obj = data;
})


    async function foo() {
        let obj;
      
        const res = await fetch('http://192.168.2.35:3000/voted')
      
        obj = await res.json();
        fetch(`https://pokeapi.co/api/v2/pokemon/${obj}`)
.then((response) => response.json())
.then((data) => {
    document.querySelector("#imgSlot").innerHTML = `
    
    <img 
     src="${data.sprites.other["official-artwork"].front_default}"
     alt="${data.name}"
     />
    `

})

      
        console.log(obj)
      }
      
      foo();

      async function doo() {
        let obj;
      
        const res = await fetch('http://192.168.2.35:3000/voted')
      
        obj = await res.json();

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${obj}`).then((result) => {
  result.json().then((data) => {

    // We filter the array of flavor texts only for the ones that have the language `en`
    const fileterdFlavorTextEntries = data.flavor_text_entries.filter(
      (element) => element.language.name === "en"
    );
    // If there's any entries, let's get the first one
    const flavorTextEntry = fileterdFlavorTextEntries.length > 0 ? fileterdFlavorTextEntries[3] : {};
    console.log(flavorTextEntry);

    // If we want, we can reassign the `flavor_text_entries` array to one with just the entry we have
    data.flavor_text_entries = [flavorTextEntry];
    console.log(data);
    
    // Or if we just want the flavor text itself
    const flavorText = flavorTextEntry.flavor_text;

    document.querySelector("#weekInfo").innerHTML = `
    <p id="nameOfPkmn">
   
              ${capFirstLetter(obj)}
              ${flavorText}
               </p>
`
    console.log("############## " + flavorText)
  });
});

// const pokemonName = lowerCaseName(name);



      }
doo();


