import './DeleteAnimal.css'
import {useState} from "react";
import {ENDPOINTS} from "../../../api/endpoints";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import axios from "axios";

export default function DeleteAnimal() {

    const [animalId, setAnimalId] = useState("");
    const {getItem} = useLocalStorage();

    const deleteAnimal = async (event) => {
        const token = getItem("token");
        const url = `${ENDPOINTS.deleteAnimal}?id=${animalId}`;
        event.preventDefault();
        const response = await axios.delete(url, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
            },
        });
    }

    return (
        <div className="container-delete-animal">
            <form className="form-delete-animal" onSubmit={deleteAnimal}>
                <h2 className="animal-header-delete-animal">Wybierz ID:</h2>
                <div className="animal-box-delete-animal">
                    <div className="animal-delete-animal">
                        <div className="id-delete-animal">
                            <label className="label-id-delete-animal" htmlFor="id">ID:</label>
                            <input className="input-id-delete-animal" type="number" id="id" name="id"  value={animalId}  onChange={event => setAnimalId(event.target.value)} required/>
                        </div>
                    </div>
                    <div className="button-delete-animal">
                        <input className="input-send-delete-animal" type="submit" id="submit" value="Usuń" />
                    </div>
                </div>
            </form>
        </div>
    )
}