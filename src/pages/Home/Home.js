import './Home.css';
import {Link} from "react-router-dom";
import homeImage from "../photo/home.jpg";

export default function Home() {

    let id = 0;
    return (
        <div className="home-page">
            <div className="central-bar">
                <img src={homeImage} alt="animal" className="central-photo"/>
            </div>
            <div className='container'>
                <Link to="/adopt?type=DOG" className="adopt-a-dog">
                    Adoptuj psa
                </Link>
                <Link to="/adopt?type=CAT" className="adopt-a-cat">
                    <p>Adoptuj kota</p>
                </Link>
                <Link to={`/donate/${id}`} className="support">
                    <p>Wesprzyj nas</p>
                </Link>
                <Link to="/voluntary" className="voluntary">
                    <p>Wolonariat</p>
                </Link>
            </div>
        </div>
    )
}