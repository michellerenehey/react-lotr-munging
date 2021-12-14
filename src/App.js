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
    console.log('characters full data', data);

    const characterData = data.map((item) => ({
      name: item.name,
      birth: item.birth,
      death: item.death,
      dates: item.birth === item.death ? 'Unknown' : `${item.birth} - ${item.death}`,
    }));
    console.log('characters partial', characterData);

    setCharacters(characterData);
  };

  // dates one use a ternary (condiitonally set the property)
  // propterty: something ? someValue : someOtherValue

  // birth: "Before the Shaping of Arda"
  // created_at: "2021-12-13T22:47:37+00:00"
  // death: "01/25/3019"
  // id: 1
  // name: "Gandalf"
  // race: "Maiar"

  // Add your code here!
  // 1. Get data using fetch from https://the-one-api.dev/v2/character/
  // 2. Update the response data with the key `dates` which is a combination of
  //    the `birth` key and the `death key` separated with a dash. If neither date
  //    is provided, it should hold the string 'Unknown'
  //    [
  //       {name: 'Adanel', birth: "", death: "", dates: "Unknown", ...},
  //       {name: 'Adrahil I', birth: "Before , TA 1944", death: "Late , Third Age", dates: "Before , TA 1944 - Late , Third Age", ...},
  //       {name: 'Adrahil II', birth: "TA 2917", death: "TA 3010, dates: "TA 2917 - TA 3010", ...},
  //    ]
  // 3. Set the resulting transformation as state using setCharacters
  // 4. You'll know it works if the characters show up on the page

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
