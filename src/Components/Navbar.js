import React, { useState } from 'react';
import { Link , useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar({isLoggedIn, setLoggedIn}) {

    // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        console.log("token --> " + token);
        try {
            await fetch('http://localhost:8081/auth/logout', {
                method: 'GET',
                headers: {
                    "Authorization": token,
                },
            });

            setLoggedIn(false);
        } catch (error) {
            console.error('Błąd wylogowywania:', error);
        }
    };

    return <nav className="nav">
        {/*dodajemy clas name, zeby dalo sie stylowac*/}
        <Link to="/" className="site-title">Schronisko</Link>
        <ul>
            <CustomLink to="/adopt">Zaadoptuj</CustomLink>
            <CustomLink to="/donate">Wesprzyj</CustomLink>
            <CustomLink to="/contact">Kontakt</CustomLink>
            <CustomLink to="/about">O nas</CustomLink>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Wyloguj</button>
            ) : (
                <CustomLink to="/login">Zaloguj</CustomLink>
            )}
        </ul>
    </nav>

    {    //example navbar
        //     return  <nav>
        //     <a href="/html/">HTML</a> |
        //     <a href="/css/">CSS</a> |
        //     <a href="/js/">JavaScript</a> |
        //     <a href="/python/">Python</a>
        // </nav>
    }

function CustomLink({to, children, ...props}) {
    // const path = window.location.pathname\
    const resolvedPath = useResolvedPath(to)        //todo nie wiem czy uzycie tego jest
    //dobre, poniewaz absolote path beda komunikowac sie z backend api po endpointcie,
    // a te resolved nie wiem jak to robia
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        //li posiada className, ktore bedzie rowne href
        //w innym przypadku, czyli kiedy className bedzie rowne active to bedzie rowne nothing
        <li className={isActive/* === to */? "active" : ""}>
            <Link to={to}{...props}>
                {children}
            </Link>
        </li>
    )
}
}