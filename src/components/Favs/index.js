import React,{Component} from 'react';
import MovieRow from '../MovieRow/index';
// Favs Component
class Favs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      movies: [],
      error: false
    };
  };
// get movies from local storage
  componentDidMount() {
    const movies = localStorage.getItem("favs-movies");
    if (movies) {
      this.setState({ movies: JSON.parse(movies) });
    }
  }
// rendere
   render() {
    const { movies, loading, error } = this.state;
     return (
      <div className="col-12 anchor" id="favs">
      <h1>Mis favoritas</h1>
      <div className="row">
          {!loading && movies.map(movie =>
           <MovieRow movie ={movie}  key={movie.id}/>
          )}
          {loading && 
          <div className="col-12 text-center">
            <p>Cargando información...</p>
            </div>
        }
          {!loading && !error && !movies.length && 
            <div className="col-12 text-center">
              <h3>Aún no has agregado películas favoritas.</h3>
            </div>
            }
          {!loading && error && 
            <div className="col-12 text-center">
                <h2>Ocurrió un error.</h2>
            </div>
            }
      </div>
   </div>
     );
   }
 };
 export default Favs;