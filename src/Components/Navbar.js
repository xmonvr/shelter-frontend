import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../auth/useAuth";

export default function Navbar() {

    const {user, logout} = useAuth();
    const defaultId = 0;

    return <nav className="nav">
        <Link to="/" className="site-title">Schronisko</Link>
        <ul className="nav-list">
            <div className="administration-nav-bar">
                {user && user.role === "ADMIN" && (
                    <NavLink to="/administration-page" className={({isPending, isActive, isTransitioning}) => isPending ? "pending" : isActive ? "active2" : isTransitioning ? "Transitioning" : ""}>Administracja</NavLink>
                )}
            </div>

            <NavLink to="/adopt" className={({isPending, isActive, isTransitioning}) => isPending ? "pending" : isActive ? "active2" : isTransitioning ? "Transitioning" : ""}>Zaadoptuj</NavLink>
            <NavLink to={`/donate/${defaultId}`} className={({isPending, isActive}) => isPending ? "pending" : isActive ? "active2" : ""}>Wesprzyj</NavLink>
            <NavLink to="/contact" className={({isPending, isActive}) => isPending ? "pending" : isActive ? "active2" : ""}>Kontakt</NavLink>
            <NavLink to="/about" className={({isPending, isActive}) => isPending ? "pending" : isActive ? "active2" : ""}>O nas</NavLink>
            {user ? (
                <button className="logout" onClick={logout}>Wyloguj</button>
            ) : (
                <NavLink to="/login" className={({isPending, isActive}) => isPending ? "pending" : isActive ? "active2" : ""}>Zaloguj</NavLink>
            )}
        </ul>
    </nav>


}