const containerlist = document.querySelector("#containerlist");
const pokemonCount = 480
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

const fetchAllPokemons = async () => {
    const promises = [];

    for (let i = 1; i <= pokemonCount; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(response => response.json()));
    }

    const pokemonsData = await Promise.all(promises);
    createPokemonCards(pokemonsData);
}

const createPokemonCards = (pokemonsData) => {
    pokemonsData.forEach(poke => {
        createPokemonCard(poke);
    });
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("card1");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    const pokemonInnerHTML = `
        <div id="card1" class="card1">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}" id="pokemon">
            <div class="number"><span id="number">${id}</span></div>
            <div class="name"><span id="nome">${name}</span></div>
            <div class="type" style="background-color: ${color}"><span id="type">${type}</span></div>
        </div>
    `;

    card.innerHTML = pokemonInnerHTML;
    card.addEventListener('click', () => openModal(poke));
    containerlist.appendChild(card);

    poke.weight = poke.weight / 10; // Converta para decigramas
    poke.height = poke.height / 10; // Converta para decímetros

    card.addEventListener('click', () => openModal(poke));
    containerlist.appendChild(card);
}

const searchinput = document.querySelector("#searchinput");

searchinput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card1");

    cards.forEach((card) => {
        const name = card.querySelector("#nome").textContent.toLowerCase();
        const number = card.querySelector("#number").textContent.toLowerCase();

        if (name.includes(searchTerm) || number.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

// Adicione esta parte para alterar a fonte dentro da barra de pesquisa
const searchinputText = document.querySelector("#searchinput");

// Altere 'Inter', sans-serif para a fonte desejada
searchinputText.style.fontFamily = 'Inter, sans-serif';
searchinputText.style.fontWeight = 'bold';
searchinputText.style.textTransform = 'uppercase'; // Converte todas as letras para maiúsculas
searchinputText.style.fontSize = '1.2em'; // Ajuste o tamanho do texto conforme necessário
searchinput.style.paddingLeft = '5px'; // Ajuste o valor conforme necessário


// MODAL ACTIONS
function openModal(poke) {
    const modal = document.getElementById('pokemonModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalId = document.getElementById('modalId');
    const modalType = document.getElementById('modalType'); // Adicione essa linha
    const modalWeight = document.getElementById('modalWeight');
    const modalHeight = document.getElementById('modalHeight');
    const modalStats = document.getElementById('modalStats');

    modalImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;
    modalName.textContent = poke.name[0].toUpperCase() + poke.name.slice(1);
    modalId.textContent = poke.id.toString().padStart(3, '0');
    modalType.textContent = poke.types.map(type => type.type.name).join(', '); // Adicione essa linha
    modalWeight.textContent = `Peso: ${poke.weight} kg`;
    modalHeight.textContent = `Altura: ${poke.height} m`;

    // Limpe as estatísticas existentes e adicione as novas estatísticas
    modalStats.innerHTML = '';
    poke.stats.forEach(stat => {
        const statItem = document.createElement('li');
        statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        modalStats.appendChild(statItem);
    });

    // Adicione a classe ao elemento do modal para a cor de fundo
    const modalTypeClass = poke.types[0].type.name; // Assumindo que há pelo menos um tipo
    modal.classList.add(modalTypeClass);

    modal.style.display = 'block';

    // Adicione classes aos elementos do modal
    modalImage.classList.add('modal-image');
    modalName.classList.add('modal-name');
    modalId.classList.add('modal-id');
}

function closeModal() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none';
}

const modal = document.getElementById('pokemonModal');

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});




fetchAllPokemons();