import './Home.css';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-page">
            <div className="central-bar">
                <p>Wesprzyj/cytat o zwierzętach ze schroniska/przesuwane różne informacje</p>
            </div>
            <div className='container'>
                <Link to="/adopt-a-dog" className="adopt-a-dog">
                    Adoptuj psa
                </Link>
                <Link to="/adopt-a-cat" className="adopt-a-cat">
                    <p>Adoptuj kota</p>
                </Link>
                <Link to="/donate" className="support">
                    <p>Wesprzyj nas</p>
                </Link>
                <Link to="/help" className="help">
                    <p>Wolonariat</p>
                </Link>
            </div>
        </div>
    )
}