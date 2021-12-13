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
    // Add your code here!
    // x 1. Get data using fetch from https://the-one-api.dev/v2/movie/ (don't forget to set your header!)
    // 2. Transform the response so that films contains nested arrays of:
    //   - the film's title
    //   - the film's title "slugified" i.e. in all lower case, with words separated with dashes,
    //   - the box office total
    //   - academy award nominations
    // NOTE: make sure you look at the response from the server - it may not be consistent
    // [["The Lord of the Rings Series", "the-lord-of-the-rings-series", 2917, 30 ], ["The Hobbit Series", "the-hobit-series", 2932, 7]...]

    // 3. Set the resulting transformation as state using setFilms
    // 4. You'll know it works if the films show up on the page

    const response = await fetch('https://the-one-api.dev/v2/movie/', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
    const data = await response.json();
    const dataArr = data.docs.map((item) => [item.name, item.name.toLowerCase()]);
    console.log(dataArr);
    setFilms(dataArr);
    // console.log(data);

    // data.map((item) => {
    //   item.docs;
    // });
    // console.log(data);
    // const filmDataArr = filmData.map((film) => {
    //   return film.name, film.boxOfficeRevenueInMillions, film.academyAwardNominations;
    // });

    // console.log(filmDataArr);
    // do a data.map to run through the data

    // here is what the data look slike
    //   {
    //     "_id": "5cd95395de30eff6ebccde56",
    //     "name": "The Lord of the Rings Series",
    //     "runtimeInMinutes": 558,
    //     "budgetInMillions": 281,
    //     "boxOfficeRevenueInMillions": 2917,
    //     "academyAwardNominations": 30,
    //     "academyAwardWins": 17,
    //     "rottenTomatoesScore": 94
    // }

    // transform the above data to look like this:
    // [["The Lord of the Rings Series", "the-lord-of-the-rings-series", 2917, 30 ], ["The Hobbit Series", "the-hobit-series", 2932, 7]...]

    // setFilm in this function, too

    // here is what the pokedex fetch looked like:
    // const fetchData = async () => {
    //   const data = await getPokemon(query, order, selectedType, currentPage);
    //   // console.log(data);
    //   setPokemonList(data.results);
    //   setLoading(false);
    // };

    // return [];
    // can leave line 50 as it is (or delete it?)
  };

  const getCharacters = async () => {
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
    return [];
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
            <h1>hello 2</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
