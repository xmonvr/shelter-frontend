import "./About.css";
import {ENDPOINTS} from "../../api/endpoints";
import axios from "axios";
import {useEffect, useState} from "react";

export function About() {

    const [about, setAbout] = useState(null);

    const getAbout = async () => {
        try {
            const url = ENDPOINTS.about;
            const response = await axios.get(url); //params - klucz
            if (!response.data) {
                return console.error(
                    "Błąd podczas pobierania pobierania zakładki O nas.",
                    response.statusText
                );
            }
            setAbout(response.data);
        } catch(error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    };

    useEffect(() => {
        getAbout();
    }, []);

    return (
        <div className="container-about">
            <div className="box-about">
                <h2 className="header-about">O naszym schronisku</h2>
                <div className="info-about">
                    <p>{about && about.aboutUsEntry}</p>
                </div>
            </div>
        </div>
    );
}
