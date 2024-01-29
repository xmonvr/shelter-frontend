import './EditVoluntary.css';
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import axios from "axios";
import {ENDPOINTS} from "../../../api/endpoints";

export default function EditVoluntary() {

    const {getItem} = useLocalStorage();
    const handleEditVoluntary = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const token = getItem("token");
        const url = ENDPOINTS.editVoluntery;
        const response = await axios.post(url, data,
            {
                headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            )
    }
    return (
        <div className="container-edit-voluntary">
            <form className="form-edit-voluntary" onSubmit={handleEditVoluntary}>
                <h2 className="header-edit-voluntary">Edytuj zakładkę "Wolontariat"</h2>
                <div className="box-edit-voluntary">
                    <div className="edit-voluntary">
                        <label className="label-edit-voluntary" htmlFor="volunteeringEntry">Tekst:</label>
                        <textarea className="input-edit-voluntary" type="text" id="volunteeringEntry" name="volunteeringEntry" rows="4" maxLength="700" required/>
                    </div>
                    <div className="button-edit-voluntary">
                        <input className="input-send-edit-voluntary" type="submit" id="submit" value="Dodaj" />
                    </div>
                </div>
            </form>
        </div>
    )
}