// const linkToImg = 'https://pokeapi.co/api/v2/pokemon/bagon';
// const name = 
function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
fetch('http://localhost:3000/voted')
.then((response) => response.json())
.then(data => {
    obj = data;
})


    async function foo() {
        let obj;
      
        const res = await fetch('http://localhost:3000/voted')
      
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
    document.querySelector("#weekInfo").innerHTML = `
         <p id="nameOfPkmn">
        
                   ${capFirstLetter(obj)}
                    </p>
    `
})

      
        console.log(obj)
      }
      
      foo();

// const pokemonName = lowerCaseName(name);





