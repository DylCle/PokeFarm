async function location() {
    let obj;
  
    const res = await fetch('http://localhost:3000/voted')
  
    obj = await res.json();
  
    fetch("https://pokeapi.co/api/v2/pokemon/ditto/encounters")
    .then(response => response.json())
    .then(data => {
      // Extracting location information from the response
      const locations = data.map(encounter => encounter.location_area.name);
      console.log(locations);
    })
    .catch(error => {
      console.log("Error:", error);
    });
    // const pokemonName = lowerCaseName(name);
  
  
  
  }

  fetch("https://pokeapi.co/api/v2/pokemon/ditto/encounters")
  .then(response => response.json())
  .then(data => {
    // Accessing the 12th element in the response
    const location = data[12].location_area.name;
    const withoutDashes = location.replace(/-/g, " ");
    const words = withoutDashes.split(" ");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const concatenatedString = capitalizedWords.join(" ");
    console.log(concatenatedString);
  })
  .catch(error => {
    console.log("Error:", error);
  });