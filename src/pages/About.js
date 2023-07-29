 import {useEffect, useState} from "react";
import "./About.css"

export default function About() {

    const [shelterInfo, setShelterInfo] = useState("");

    const getAbout = async () => {

        try {
            const url = `http://localhost:8081/tab/get-about-entry`;
            const response = await fetch(url);
            if (response.ok) {
                const info = await response.json();
                setShelterInfo(info);
                console.log("info --> " + info)
            } else {
                console.error("Błąd: ", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    }

    useEffect(() => {
        getAbout();
    }, []);

    return (
        <div className="container-about">
            <div className="box-about">
                <h2 className="header-about">O naszym schronisku</h2>
                <div className="info-about">
                    <p>{shelterInfo.aboutUsEntry}</p>
                </div>
            </div>
        </div>
    )
}