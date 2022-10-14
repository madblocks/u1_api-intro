console.log('test')


let button = document.querySelector('#searchButton')
let textInput = document.querySelector('#inputBar')
const url = 'https://pokeapi.co/api/v2/'
let pokeData = {}

// old method?
async function getData(event) {
    // prevent default behavior of browser (refreshing browser to )
    event.preventDefault()

    pokeId = textInput.value.toLowerCase()
    pokeUrl = `${url}pokemon/${pokeId}`
    
    // req and res
    // request and response
    fetch(pokeUrl)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log('success!', res)
            displayPokemon(res)
            getSpecies(res)
        })
        .catch(err => {
            console.log('error!', err)
        })
}

const displayPokemon = (pokemon) => {
    // Note: somehow it finds the ID of the html element without using document.querySelector
    pokeData = pokemon
    pokeName.innerText = pokemon.name
    let pokemonImg = pokemon.sprites.front_default
    console.log(pokemonImg)
    let image = document.querySelector('#pokeImg')
    image.src = pokemonImg

    // List Moves
    // let firstThreeMoves = []
    let moveListItems = document.querySelectorAll('.moveListItem')
    if (true) {
        moveListItems.forEach(e => e.remove())
    }

    for (let i = 0; i < 3; i++) {
        let pokeMove = pokemon.moves[i].move.name
        let moveLi = document.createElement('li')
        document.querySelector('#movesList').appendChild(moveLi)
        moveLi.innerText = pokeMove
        moveLi.className = 'moveListItem'
    }
    movesHeading.style.display = 'inline'

    
    //display evolutions
    // displayEvolutions(pokemon)
}

async function getSpecies(pokemon) {

    let speciesUrl = pokemon.species.url
    console.log(speciesUrl)
    
    fetch(speciesUrl)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log('Grabbed Species!', res)
            getEvolutionChain(res)
        })
        .catch(err => {
            console.log('error!', err)
        })
}

async function getEvolutionChain(species) {

    let evolutionChainUrl = species.evolution_chain.url
    console.log(evolutionChainUrl)
    
    fetch(evolutionChainUrl)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log('Grabbed Evolutions!', res)
            displayEvolutions(res)
        })
        .catch(err => {
            console.log('error!', err)
        })
}

async function displayEvolutions(evolution) {
    
    console.log(evolution.chain)
    console.log(evolution.chain.evolves_to[0].species)

    // evolutionsDiv.style.display = 'inline'

    pokeEvolutionName = evolution.chain.evolves_to[0].species.name
    pokeEvolutionNameUrl = evolution.chain.evolves_to[0].species.url
    
    fetch(pokeEvolutionNameUrl)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log('Grabbed Evolved Species', res)
                
            })
            .catch(err => {
                console.log('error!', err)
            })

    // getEvolvedSpecies(pokeEvolutionNameUrl)
}

// async function getEvolvedSpecies(evolved) {

//     console.log(speciesUrl)
    
//     fetch(speciesUrl)
//         .then(res => {
//             return res.json()
//         })
//         .then(res => {
//             console.log('Grabbed Species!', res)
//             getEvolutionChain(res)
//         })
//         .catch(err => {
//             console.log('error!', err)
//         })
// }

button.addEventListener('click', getData)
