import { useEffect, useState } from 'react'
import './styles/styles.css'
function App() {
const [pokemons, setPokemons] = useState([])
const [score, setScore] = useState({
  currentScore: 0,
  bestScore: 0
});

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array
}
const getRandomId = () => {
  return Math.floor(Math.random() * 1000)
}
const pokemon = async () => {
  setPokemons([]);
  try {
    const pokemonDataList = [];
    while (pokemonDataList.length < 20) {
      const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId()}`).then((response) => response.json());
      const pokemonData = await pokemonPromise;

      const exists = pokemonDataList.find((pokemon) => pokemon.name === pokemonData.name);
      if (!exists) {
        pokemonDataList.push(pokemonData); 
      }
    }
    setPokemons(pokemonDataList); 
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  pokemon();
}, []);

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
    const updatedPokemons = pokemons.map((poke) =>
      poke.name === pokemon.name ? { ...poke, clicked: true } : poke
    );
    setPokemons(shuffle([...updatedPokemons]))
  }
  
} 



return (
    <>
      <h1>Remember the Pokemons</h1>
      <button onClick={() => pokemon()}>GET NEW POKEMON</button>
      <div className='score'>
        <h2>START PLAYING BY CLICKING ON A POKEMON!</h2>
        <div>
          <h3>your current score is {score.currentScore}</h3>
          <h3>your best score is {score.bestScore}</h3>
        </div>   
      </div>
      
      <div className='pokemons'>
        {
        pokemons.length === 20 ?
        pokemons.map(pokemon => (        
          <div key={pokemon.name + pokemon.id}>
            <img onClick={() => handlePokemonClick(pokemon)} src={pokemon.sprites.front_default} alt="pokemon" />
            <h3>{pokemon.name}</h3>
          </div>
        )): <p>Loading...</p>
      } 
      </div>
    </>
  )
}

export default App
