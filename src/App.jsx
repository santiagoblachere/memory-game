import { useEffect, useState } from 'react'
import './styles/styles.css'
function App() {
const [pokemons, setPokemons] = useState([])
const [score, setScore] = useState({
  currentScore: 0,
  bestScore: 0
});


const getRandomId = () => {
  return Math.floor(Math.random() * 1000)
}
const pokemon = async() => {
    try {
     const pokemonPromises = [];
     while (pokemonPromises.length < 20) {
      let pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId()}`).then(response => response.json()); 
      let pokemonData = await pokemonPromise    
      let exists = await pokemonPromises.find(pokemon => pokemon.name === pokemonData.name);
      if (!exists) {
        pokemonPromises.push(pokemonPromise)
      }
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

const handlePokemonClick = (pokemon) => {
  if (pokemon.clicked === true) {
    console.log(score.currentScore, score.bestScore)
    if(score.currentScore > score.bestScore) {
      setScore( (prevScore) => {
        return {
          ...prevScore,
          bestScore: prevScore.currentScore
        }
      })
    }
    setScore((prevScore) => ({
      ...prevScore,
      currentScore: 0
    }));
    const resetPokemons = pokemons.map(pokemon => ({
      ...pokemon,
      clicked: false
    }));
    setPokemons(resetPokemons)
  } else {
    setScore((prevScore) => ({
      ...prevScore,
      currentScore: prevScore.currentScore + 1
    }));
    pokemon.clicked = true;
  }
} 



return (
    <>
      <h1>COOOL MEMORY GAME HAH!</h1>
      <button onClick={() => pokemon()}>POKEMONINS</button>
      <h2>START PLAYING BY CLICKING ON A POKEMON!</h2>
      <h3>your score is {score.currentScore}</h3>
      <h3>best score is {score.bestScore}</h3>
      <div className='pokemons'>
        {pokemons.map(pokemon => (        
          <div key={pokemon.name + pokemon.id}>
            <img onClick={() => handlePokemonClick(pokemon)} src={pokemon.sprites.front_default} alt="pokemon" />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
