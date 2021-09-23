const pokeCard = document.querySelector("#poke-card")
const pokeName = document.querySelector("#poke-name")
const pokeImgContainer = document.querySelector("#poke-img-container")
const pokeImg = document.querySelector("#poke-img")
const pokeId = document.querySelector("#poke-id")
const pokeTypes = document.querySelector("#poke-types")
const pokeStats = document.querySelector("#poke-stats")
const pokeShiny = document.querySelector("#poke-shiny")
const pokeMale = document.querySelector("#poke-male")
const pokeBack = document.querySelector("#poke-back")

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    $.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`, (res) => {
        renderPokemonData(res)

        pokeShiny.onclick = () => {
            pokeImg.setAttribute("src", res.sprites.front_shiny)
        }
        pokeMale.onclick = () => {
            pokeImg.setAttribute("src", res.sprites.front_default)
        }
        pokeBack.onclick = () => {
            pokeImg.setAttribute("src", res.sprites.back_default)
        }

    })
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default
    const { stats, types} = data;
    
    pokeName.textContent = data.name
    pokeImg.setAttribute("src", sprite)
    pokeId.textContent = `N° ${data.id}`
    setCardColor(types)
    renderPokemonTypes(types)
    renderPokemonStats(stats)
}

const setCardColor = types => {
    const colorUno = typeColors[types[0].type.name]
    const colorDos = types[1] ? typeColors[types[1].type.name] : typeColors.default

    pokeImg.style.background = `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`
    pokeImg.style.backgroundSize = " 5px 5px"
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ""
    types.forEach(type => {
        const typeTextElement = document.createElement("div")
        typeTextElement.style.color = typeColors[type.type.name]
        typeTextElement.textContent = type.type.name
        pokeTypes.appendChild(typeTextElement)
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = ""
    stats.forEach( stat => {
        const statElement = document.createElement("div")
        const statElementName = document.createElement("div")
        const statElementAmount = document.createElement("div")

        statElementName.textContent = stat.stat.name
        statElementAmount.textContent = stat.base_stat

        statElement.appendChild(statElementName)
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement)
    })
}