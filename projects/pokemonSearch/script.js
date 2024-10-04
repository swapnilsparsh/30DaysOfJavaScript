// Get references to the DOM elements
const userInput = document.getElementById("search-input"); 
const submitBtn = document.getElementById("search-button"); 
const pokemonImage = document.getElementById("pokemon-image"); 

// Elements to display Pokémon details
const pokemonName = document.getElementById("pokemon-name"); 
const pokemonId = document.getElementById("pokemon-id"); 
const pokemonWeight = document.getElementById("weight"); 
const pokemonHeight = document.getElementById("height"); 
const pokemonTypes = document.getElementById("types"); 

// Elements for Pokémon stats
const hp = document.getElementById("hp"); 
const attack = document.getElementById("attack");
const defense = document.getElementById("defense"); 
const specialAttack = document.getElementById("special-attack"); 
const specialDefense = document.getElementById("special-defense"); 
const speed = document.getElementById("speed"); 

// Function to search the Pokédex based on user input
const searchPokedex = async () => {
  // Check if the input field is empty and return if true
  if (userInput.value === "") {
    return;
  }

  try {
    // Fetch Pokémon data from the API using the user input (converted to lowercase)
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput.value.toLowerCase()}`);
    const data = await res.json(); // Parse the JSON response

    // Destructure necessary properties from the fetched data
    const { name, id, weight, height, types, stats, sprites } = data;

    // Update the Pokémon image element with the fetched sprite
    pokemonImage.innerHTML = `
      <img src="${sprites.front_default}" id="sprite">
    `;

    // Update the HTML elements with the fetched Pokémon details
    pokemonName.innerHTML = name.toUpperCase(); // Display name 
    pokemonId.innerHTML = `#${id}`; // Display Pokémon ID

    pokemonWeight.innerHTML = `Weight: ${weight}`; 
    pokemonHeight.innerHTML = `Height: ${height}`;
    
    // Display types with appropriate styling based on type names
    pokemonTypes.innerHTML = types.map(type => `<span class="${type.type.name.toLowerCase()}">${type.type.name.toUpperCase()}</span>`).join(" ");

    // Update stats in their respective elements
    hp.innerHTML = stats[0].base_stat; 
    attack.innerHTML = stats[1].base_stat; 
    defense.innerHTML = stats[2].base_stat; 
    specialAttack.innerHTML = stats[3].base_stat; 
    specialDefense.innerHTML = stats[4].base_stat; 
    speed.innerHTML = stats[5].base_stat; 
  }
  catch(err) {
    console.log(err); 
    alert("Pokemon not found"); 
  }
}

// Event listener for button click to trigger search function
submitBtn.addEventListener("click", searchPokedex);

// Event listener for 'Enter' key press to trigger search function
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPokedex(); // Call search function on 'Enter' key press
  }
});