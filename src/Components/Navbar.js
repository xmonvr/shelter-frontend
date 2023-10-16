import { Link  } from "react-router-dom";
import {useAuth} from "../auth/auth";
import {CustomLink} from "./CustomLink";

export default function Navbar() {

    const { user, logout } = useAuth();
    const defaultId = 0;

    const handleLogout = () => {
        logout();
    }

    return <nav className="nav">
        {/*dodajemy clas name, zeby dalo sie stylowac*/}
        <Link to="/" className="site-title">Schronisko</Link>
        <ul>
            <div className="administration-nav-bar">
                {user && user.role === "ADMIN" && (
                    <CustomLink to="/administration-page">Administracja</CustomLink>
                )}
            </div>

            <CustomLink to="/adopt">Zaadoptuj</CustomLink>
            <CustomLink to={`/donate/${defaultId}`}>Wesprzyj</CustomLink>
            <CustomLink to="/contact">Kontakt</CustomLink>
            <CustomLink to="/about">O nas</CustomLink>
            {user ? (
                <button className="logout" onClick={handleLogout}>Wyloguj</button>
            ) : (
                <CustomLink to="/login">Zaloguj</CustomLink>
            )}
        </ul>
    </nav>


}