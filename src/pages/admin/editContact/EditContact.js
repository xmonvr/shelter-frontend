import './EditContact.css';
import {ENDPOINTS} from "../../../api/endpoints";
import axios from "axios";

export default function EditContact() {

    const handleEditContact = (event) => {
        const token = localStorage.getItem("token");
        event.preventDefault();
        const form = event.target;
        const contactEntry = form.elements.contactEntry.value;
        const url =  ENDPOINTS.editContact;
        const response = axios.post(url, contactEntry, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        }

    return (
        <div className="container-edit-contact">
            <form className="form-edit-contact" onSubmit={handleEditContact}>
                <h2 className="header-edit-contact">Edytuj zakładkę "Kontakt"</h2>
                <div className="box-edit-contact">
                    <div className="edit-contact">
                        <label className="label-edit-contact" htmlFor="contactEntry">Tekst:</label>
                        <textarea className="input-edit-contact" type="text" id="contactEntry" name="contactEntry" rows="4" maxLength="5000" required/>
                    </div>
                    <div className="button-edit-contact">
                        <input className="input-send-edit-contact" type="submit" id="submit" value="Dodaj" />
                    </div>
                </div>
            </form>
        </div>
    )
}