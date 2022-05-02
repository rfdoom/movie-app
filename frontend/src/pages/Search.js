import axios from "axios";
import { useState } from 'react'


function Search(props) {

  const [searchResults, setSearchResults] = useState('')
  const [values, setValues] = useState({movie: searchResults['id'], author: '', stars: '', comment: ''})
  const [reviews, setReviews] = useState([])
 
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios.post('http://localhost:8000/api/result/', new FormData(e.target))
      .then((response) => {
      console.log(response)
      setSearchResults(response.data[0])
      })
    }
    catch (e) {
      console.error(e);
    }
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleReview = (e) => {
    try {
      e.preventDefault()
      console.log(values)
      axios.post('http://localhost:8000/api/review/', new FormData(e.target) )
      .then(response => {
        JSON.stringify(response)
        console.log('response:', response)
        setReviews((prevState) => [...prevState, response.data]);
        //console.log(reviews)
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <br /> <br /> <br /><br /> <br /> <br /><br /> <br />
      <form action="/" method="get" onSubmit={handleSubmit}>
        <label htmlFor="header-search">
          <span className="movie-search">Search Movies</span>
        </label>
        <br /><br />
        <input
          type="text"
          id="header-search"
          placeholder="Search movies..."
          name="search"
          className="movie-search-bar"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <br />
      <div>
        <span className="note">NOTE: When you search, you add that movie to the database.</span>
      </div>
      <br />
      <h2 className="movie-title">{searchResults['title']}</h2>
      <h3 className="movie-release">{searchResults['release_date']}</h3>
      <h3 className="movie-overview">{searchResults['overview']}</h3>
      <h4>{reviews}</h4>
      <div className="leave-review">
        {searchResults ? (
          <form action="/search" method="get" onSubmit={handleReview}>
            <h3 className="review-label">Want to leave a review?</h3>
            <input type="hidden" name="movie" defaultValue={searchResults['id']}/>
            <label className="review-label">Author: </label>
            <input type="text" placeholder="Enter Your Name..." name="author" onChange={handleChange}/>
            <br /><br />
            <label className="review-label">Rating: </label>
            <select name="stars" onChange={handleChange}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <br /><br />
            <label className="review-label">Review: </label>
            <textarea type="text" placeholder="Enter Your Review..." name="comment" onChange={handleChange}/>
            <br /><br />
            <button type="submit" className="submit-button">Submit Review</button>
            <br /> <br />
          </form>
        ):(
          <h2>Use the above to search for a movie.</h2>
        )}
      </div>
    </div>
  )
}

export default Search;