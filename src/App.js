import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    const response = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/films`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    const filmData = data.map((film) => [
      film.title,
      film.title.toLowerCase().replace(/\s/g, '-'),
      //.toLowerCase().split(what to split it on: ' ').join('-')
      film.boxOfficeRevenueInMillions,
      film.academyAwardNominations,
    ]);
    setFilms(filmData);
  };

  const getCharacters = async () => {
    const response = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/characters`, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
      },
    });
    const data = await response.json();
    const characterData = data.map((item) => ({
      name: item.name,
      birth: item.birth,
      death: item.death,
      dates: item.birth === item.death ? 'Unknown' : `${item.birth} - ${item.death}`,
    }));
    setCharacters(characterData);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          <Route exact path="/films">
            <FilmList films={films} />
          </Route>
          <Route exact path="/characters">
            <CharacterList characters={characters} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
