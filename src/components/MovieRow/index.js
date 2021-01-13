import React,{Component} from 'react';
import { Link } from 'react-router-dom';
// Movie card component
class MovieRow extends Component {
    render(){
        return(
            <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2 col-xl-2 float-left text-center movierow" key={this.props.movie.id}>
               <Link to={`/movie/${this.props.movie.id}`}>
                <img className="img-thumbnail thumb" alt="poster" src={`https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`}/>
                <h5> {this.props.movie.title}</h5>
                <p>Nota: {this.props.movie.vote_average}</p>
                </Link>
            </div>
        )
    };
}
export default MovieRow;