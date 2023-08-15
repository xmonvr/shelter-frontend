import "./Contact.css"
import {useContact} from "./useContact";

export default function Contact() {
    // znowu robimy destrukturyzacje
    const {contactData, error} = useContact();

    if (error) {
        return <p>Błąd podczas komunikacji z serwerem: {error}</p>
    }

    return (
        <div className="container-contact">
            <div className="box-contact">
                <h2 className="header-contact">Kontakt</h2>
                <div className="info-contact">
                    <p>{contactData && contactData.contactEntry}</p>
                </div>
            </div>
        </div>
    )
}