import './EditAboutUs.css';
import {ENDPOINTS} from "../../../api/endpoints";
import axios from "axios";
import {useLocalStorage} from "../../../hooks/useLocalStorage";

export default function EditAboutUs() {
    const {getItem} = useLocalStorage();

    const handleEditAboutUs = async (event) => {
        const token = getItem("token");
        event.preventDefault();
        const form = event.target;
        const aboutUsEntry = form.elements.aboutUsEntry.value;
        const url =  ENDPOINTS.editAbout;
        const response = await axios.post(url, aboutUsEntry, {
                headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
        });
    }

    return (
        <div className="container-edit-about-us">
            <form className="form-edit-about-us" onSubmit={handleEditAboutUs}>
                <h2 className="header-edit-about-us">Edytuj zakładkę "O nas"</h2>
                <div className="box-edit-about-us">
                    <div className="edit-about-us">
                        <label className="label-edit-about-us" htmlFor="aboutUsEntry">Tekst:</label>
                        <textarea className="input-edit-about-us" type="text" id="aboutUsEntry" name="aboutUsEntry" rows="4" maxLength="5000" required/>
                    </div>
                    <div className="button-edit-about-us">
                        <input className="input-send-edit-about-us" type="submit" id="submit" value="Dodaj"/>
                    </div>
                </div>
            </form>
        </div>
    )
}