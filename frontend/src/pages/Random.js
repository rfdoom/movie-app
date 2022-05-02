import axios from "axios";
import { useState, useEffect } from 'react'


function Random(props) {

  const [randomMovie, setRandomMovie] = useState('')
 
  const handleRandom = (e) => {
    try {
      e.preventDefault();
      axios.post('http://localhost:8000/api/random/', new FormData(e.target))
      .then((response) => {
      console.log(response)
      setRandomMovie(response.data)
      })
    }
    catch (e) {
      console.error(e);
    }
  }

 


  return (
    <div>
      <br /> <br /><br /> <br /> <br /><br /> <br />
      <form action="/random" method="get" onSubmit={handleRandom}>
        <button type="submit" className="random-button"><span className="button-words">Random Movie</span></button>
      </form>
      <br />
      <br />
      <h2 className="movie-title">{randomMovie['title']}</h2>
      <h3 className="movie-overview">{randomMovie['overview']}</h3>
      <h3 className="movie-release">{randomMovie['release_date']}</h3>
    </div>
  )
}

export default Random;