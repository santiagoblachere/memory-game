import { useEffect, useState } from 'react'

function App() {
const [pokemons, setPokemons] = useState([])
const pokemon = async() => {
    try {
     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
     if (!response.ok) {
       throw new Error('Fetch failed')
     }
     const data = await response.json()
     return data
    } catch (error) {
     console.log(error)
    }
} 
useEffect(() => {
  pokemon().then(data => {
    setPokemons(data)
  })
}, [])

console.log(pokemons)



  return (
    <>
      <h1>COOOL MEMORY GAME HAH!</h1>
    </>
  )
}

export default App
