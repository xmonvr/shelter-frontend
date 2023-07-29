import {useEffect, useState} from "react";
import "./Contact.css"

export default function Contact() {

    const [shelterInfo, setShelterInfo] = useState("");

    const getAbout = async () => {
        try {
            const url = `http://localhost:8081/tab/get-contact-entry`;
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
        <div className="container-contact">
            <div className="box-contact">
                <h2 className="header-contact">Kontakt</h2>
                <div className="info-contact">
                    <p>{shelterInfo.contactEntry}</p>
                </div>
            </div>
        </div>
    )
}