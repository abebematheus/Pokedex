const containerlist = document.querySelector("#containerlist");
const pokemonCount = 80
const colors = {
    fire: '#F57D31',
    grass: '#74CB48',
    electric: '#F9CF30',
    water: '#6493EB',
    ground: '#DEC16B',
    rock: '#B69E31',
    fairy: '#E69EAC',
    poison: '#A43E9E',
    bug: '#A7B723',
    dragon: '#7037FF',
    psychic: '#FB5584',
    flying: '#A891EC',
    fighting: '#C12239',
    normal: '#AAA67F',
    dark: '#75574C',
    ghost: '#70559B',
    ice: '#9AD6DF',
    steel: '#B7B9D0'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("card1")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name) 
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    
    
    const pokemonInnerHTML = `
    <div id="card1" class="card1">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}" id="pokemon">
                 <div class="number"> <span id="number">${id}</span> </div>
                 <div class="name"> <span id="nome">${name}</span> </div>
                 <div class="type" style="background-color: ${color} "> <span id="type">${type}</span> </div>
    </div>
    
    `
    card.innerHTML = pokemonInnerHTML

    containerlist.appendChild(card)

}


fetchPokemons()

