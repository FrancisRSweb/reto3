import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import './styles.css';
// importing components
import MovieRow from '../../components/MovieRow/index';
import Favs from '../../components/Favs/index';
import Footer from '../../components/Footer/index';
// Home Component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      premiere: [],
      trending: [],
      moviesF: [],
      genres: [],
      error: false,
    };
  };
  // Fetch Genres
  fetchGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=756e1622851086c3d011b8461693b962&language=es-ES')
      .then(response => response.json())
      .then(json => this.setState({ genres: json.genres }));
  };
  // Fetch Premiere movies
  fetchPremiere(genres) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES&primary_release_year=2019';
    if (genres) {
      url += '&with_genres=' + genres;
    }
    return fetch(url);
  }
  // Fetch Trending movies
  fetchTrending(genres) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES&sort_by=popularity.desc';
    if (genres) {
      url += '&with_genres=' + genres;
    }
    return fetch(url);
  }
// All together
  async componentDidMount(genres) {
    try {
      this.fetchPremiere(genres)
        .then(response => response.json())
        .then(json => this.setState({ premiere: json.results.slice(0, 12)}))
      this.fetchTrending(genres)
        .then(response => response.json())
        .then(json => this.setState({ trending: json.results.slice(0, 6)}))
      this.setState({loading: false, error: false});
    } catch(e) {
      this.setState({ loading: false, error: true })
    }
  }
  // Calling genres
  componentWillMount(){
    this.fetchGenres();
  };
  // filter movies
  changeGenre(genres) {
    this.componentDidMount(genres);
  }
  // Render
 render() {
  const { premiere,trending, genres, loading, error } = this.state;
    return (
      <div className='Home'>
        <div className='container-flex'>
        <nav className='navbar navbar-expand-lg navbar-expand-xl navbar-dark bg-danger fixed-top'>
              <div className='container'>
                <a className='navbar-brand' href='/#top'>React Movies</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarResponsive'>
                  <ul className='navbar-nav ml-auto'>
                    <li className='nav-item active'>
                      <a className='nav-link' href='/#top'><i className='fas fa-home'></i> Inicio</a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' href='/#premiere'><i className='fas fa-ticket-alt'></i> Estrenos</a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' href='/#trend'><i className='fas fa-medal'></i> Más populares</a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' href='/#favs'><i className='fas fa-star'></i> Favoritas</a>
                    </li>
                    <li>
                      <Dropdown key={genres.id}>
                        <Dropdown.Toggle variant='danger' id='dropdown-basic'> Géneros </Dropdown.Toggle>
                          <Dropdown.Menu> {genres.map(genre=> (
                            <Dropdown.Item eventKey={genre.id}  key={genre.id}  onSelect={genre => this.changeGenre(genre)}> {genre.name} </Dropdown.Item> ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>        
            <div className='col-12 anchor' id='premiere'>
                <h1>Estrenos</h1>
                <div className='row'>
                  <div className='col-12 text-left'>
                  </div>
                      {!loading && premiere.map(movie => <MovieRow movie ={movie} key={movie.id}/>)}
                      {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div> }
                      {!loading && !error && !premiere.length && <div className='col-12 text-center'> <h2>No hay información disponible.</h2></div> }
                      {!loading && error && <div className='col-12 text-center'> <h2>Ocurrió un error.</h2></div> }
                </div>
              </div>
            <div className='col-12 anchor' id='trend'>
                <h1>Películas más populares</h1>
                <div className='row'>
                    {!loading && trending.map(movie =><MovieRow movie ={movie} key={movie.id}/> )}
                    {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div> }
                    {!loading && !error && !trending.length &&  <div className='col-12 text-center'><h2>No hay información disponible.</h2> </div> }
                    {!loading && error &&  <div className='col-12 text-center'> <h2>Ocurrió un error.</h2> </div>}
                </div>
            </div>
          <Favs />    
        </div>
        <Footer />   
      </div>
    );
  }
};
export default Home;

