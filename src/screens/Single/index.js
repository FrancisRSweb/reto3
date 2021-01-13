import React, { Component } from 'react';
// Importing Components
import Footer from '../../components/Footer/index';
//  Single Component
class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          movie: [],
          favs:[],
          error: false
        };
      };
      // calling data from API
      async componentDidMount() {
        try { 
            const movie_id = Object.values(this.props.match.params);
            const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=756e1622851086c3d011b8461693b962&language=es-ES`;
            this.setState({loading: true, error: false });
            const response = await fetch(url);
            const responseJson = await response.json();
            const movie = responseJson;
            this.setState({movie, loading: false, error: false });
        } catch(e) {
            this.setState({ loading: false, error: true })
        }
      };
      // Saving Favs
  saveFavs = (movie) => {
    const { favs} = this.state;
    const favorite= {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      tagline: movie.tagline,
      vote_average: movie.vote_average
    }
    let allMovies = JSON.parse(localStorage.getItem('favs-movies')) || [];
    let repeated = allMovies.filter(function(movie){ return movie.id === favorite.id}).length;
    if (!repeated){
        this.setState({favs});
        allMovies.push(favorite);
        localStorage.setItem("favs-movies", JSON.stringify(allMovies));
        alert('Agregado a favoritos :)')
    } else { alert('Esta película ya está en tus favoritos :)')};
  }
 // Render
   render() {
    const { movie, loading, error } = this.state;
        return (
            <div>
                 <nav className="navbar navbar-expand-lg navbar-expand-xl navbar-dark bg-danger fixed-top">
              <div className="container">
                <a className="navbar-brand" href="/#top">React Movies</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="/#top"><i className="fas fa-home"></i> Inicio</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#premiere"><i className="fas fa-ticket-alt"></i> Estrenos</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#trend"><i className="fas fa-medal"></i> Más populares</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/#favs"><i className="fas fa-star"></i> Favoritas</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>        
                {!loading &&  !error && movie.id &&
                    <div>
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 float-left p-2 my-2 text-center">
                            <img className="poster" alt="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                         </div>
                         <div className="col-xs-12 col-sm-6 col-md-8 col-lg-9 col-xl-9 float-left p-8 my-4 text-left">
                            <h2> {movie.title}</h2>
                            <p>{movie.tagline}</p>
                            <p>Nota: {movie.vote_average}</p>
                            <p>Resumen: {movie.overview}</p>
                            <button onClick={() => this.saveFavs(movie)}>Agregar a favoritos</button>
                        </div>
                    </div>
               }
            {loading && 
                <div class="col-12 text-center">
                    <p>Cargando información...</p>
                </div> 
            }
            {!loading && !error && !movie.id && 
                <div class="col-12 text-center">
                    <h2>No hay información disponible.</h2>
                </div>
            }
            {!loading && error && 
                <div class="col-12 text-center">
                    <h2>Ocurrió un error.</h2>
                </div>
            }
            <Footer />
            </div>
        )
    };
};
export default Single;