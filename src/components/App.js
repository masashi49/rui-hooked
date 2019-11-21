import React, {useState, useEffect} from 'react';


import '../css/App.css';

import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=woman&apikey=4a3b711b"; // you should replace this with yours

function App() {
  const axios = require('axios');


  //[value , valueに入れるためだけのメソッド] = useState(valueのdefaultの値)
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  //useEffectレンダリングが終わった後に動く レイアウトと描画の後で遅延されたイベントとして実行されます
  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(responce => responce.json())
    .then(jsonResponce => {
      setMovies(jsonResponce.Search);
      setLoading(false);
    });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    //axios使ってみたけどrequireする場所を変更しないと動かない
    axios.get(`https://www.omdbapi.com/`,
      {
        params: {
          s: searchValue,
          apikey: '4a3b711b'
        }
      })
    .then((jsonResponse) => {
      const res = jsonResponse.data
      if (res.Response === "True") {
        console.log(res.Search)
        setMovies(res.Search);
        setLoading(false);
      } else {
        setErrorMessage(res.Error);
        setLoading(false);
      }
    }).catch((error) => {
      alert(error)
    });
  }

  return (
    <div className='App'>
      <Header text="HOOKED"/> {/*propでHOOKEDを渡している*/}
      <Search search={search}/> {/*propでsearch関数を渡している*/}
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={index + ':' + movie.Title} movie={movie}/>
          ))
        )}
      </div>
    </div>
  )
}

export default App;
