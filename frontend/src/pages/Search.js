function Search(props) {
  return (
    <form action="/" method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search Movies</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search movies..."
        name="search"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default Search;