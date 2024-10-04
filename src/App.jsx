import { useEffect, useState } from 'react'
import './styles/styles.css'
function App() {
const [pokemons, setPokemons] = useState([])

const getRandomId = () => {
  return Math.floor(Math.random() * 1000)
}
const pokemon = async() => {
    try {
     const pokemonPromises = [];
     for (let index = 0; index < 10; index++) {
      pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId()}`).then(res => res.json()))
     }
     const pokemons = await Promise.all(pokemonPromises)
     setPokemons(pokemons)
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {
  pokemon()
},[])

  return (
    <>
      <h1>COOOL MEMORY GAME HAH!</h1>
      <button onClick={() => pokemon()}>POKEMONINS</button>
      <h2>START PLAYING BY CLICKING ON A POKEMON!</h2>
      <div className='pokemons'>
        {pokemons.map(pokemon => (
          <div key={pokemon.id} >
          <div>{pokemon.name}</div>
          <img src={pokemon.sprites.front_default} alt="pokemon" />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
