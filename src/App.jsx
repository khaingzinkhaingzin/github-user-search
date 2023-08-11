import { useState } from 'react'
import "./styles.css"

const API_URL = "https://api.github.com";

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function onSearchChange(event) {
    setQuery(event.target.value);
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    const results = await fetchResults(query);
    setResults(results);
  }

  return (
    <div className="app">
      <main className="main">
        <h2>Github User Search</h2>
        <Form 
          value={query} 
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
        <h3>Results</h3>
        <div id="results">
          <div>
            {results.map((user) => (
              <User 
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

function Form({ value, onChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input 
        type="text" 
        id="search"
        placeholder="Enter username or email"
        value={value}
        onChange={onChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function User({avatar, url, username}) {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}