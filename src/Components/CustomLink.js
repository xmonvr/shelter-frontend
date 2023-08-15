import {Link, useMatch, useResolvedPath} from "react-router-dom";
import React from "react";

export function CustomLink({to, children, ...props}) {
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