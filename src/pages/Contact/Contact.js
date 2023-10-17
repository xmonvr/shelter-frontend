import "./Contact.css";
import axios from "axios";
import {ENDPOINTS} from "../../api/endpoints";
import {useEffect, useState} from "react";

export default function Contact() {

    const [contact, setContact] = useState(null);

    const getContact = async () => {
        try {
            const response = await axios.get(ENDPOINTS.contact);
            if (!response.data) {
                console.log("Błąd podczas pobierania danych kontaktowych.");
            }
            setContact(response.data);
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    }

    useEffect(() => {
        getContact();
    }, []);

    return (
        <div className="container-contact">
            <div className="box-contact">
                <h2 className="header-contact">Kontakt</h2>
                <div className="info-contact">
                    <p>{contact && contact.contactEntry}</p>
                </div>
            </div>
        </div>
    )
}