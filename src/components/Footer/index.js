import React,{Component} from 'react';
// footer Component
class Footer extends Component {
    render(){
        return(
        <div className="col-12 footer d-flex align-items-end justify-content-center">
                <a href="https://www.themoviedb.org/">
                    <img src="https://www.themoviedb.org/assets/1/v4/logos/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png"   alt="The Movie Database"/>
                </a>
        </div>
        )
    };
};
export default Footer;