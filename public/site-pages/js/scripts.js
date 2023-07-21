document.querySelector('#search').addEventListener("click", getPokemon);

function lowerCaseName(string) {
    return string.toLowerCase();
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

document.getElementById("pokemonName")
    .addEventListener("keyup", function (event) {
        event.preventDefault();

        if (event.key === "Enter") {
            document.getElementById("search").click();
            event.target.blur();
        }
    });







function getPokemon(e) {
    const name = document.querySelector("#pokemonName").value;
    const pokemonName = lowerCaseName(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector(".pokemonBox").innerHTML = `
        
        <img 
         src="${data.sprites.other["official-artwork"].front_default}"
         alt="${data.name}"
         />
        <div id="name">
            <h1>${capFirstLetter(data.name)}</h1>
        </div>
        `



            document.querySelector("#votebtn").innerHTML = `
        <div id="votebtn">
        <form action="/" method="POST">
        <input type="text" value="${data.name}" name="_id" id="" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0); border: 0;" >
        <input type="numer" value="1" name="vote" id="" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0); border: 0;" >
        <button id="vote">VOTE</button>
    </form>
    </div>
        `

        }).catch((err) => {
            if (pokemonName == 'shaymin') {
                fetch(`https://pokeapi.co/api/v2/pokemon/shaymin-land`)
                    .then((response) => response.json())
                    .then((data) => {
                        document.querySelector(".pokemonBox").innerHTML = `
                
                <img 
                 src="${data.sprites.other["official-artwork"].front_default}"
                 alt="${data.name}"
                 />
                <div id="name">
                    <h1>${capFirstLetter(data.name)}</h1>
                </div>
                `

                        document.querySelector("#votebtn").innerHTML = `
                <div id="votebtn">
                <form action="/" method="POST">
                <input type="text" value="${data.name}" name="_id" id="" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0); border: 0;" >
                <input type="numer" value="1" name="vote" id="" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0); border: 0;" >
                <button id="vote">VOTE</button>
            </form>
            </div>
                `;
                    })
            } else {
                console.log('pokemon not found', err)
            }
        })



    e.preventDefault();
}







