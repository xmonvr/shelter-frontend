import './DeleteAnimal.css'
import {useEffect, useState} from "react";

export default function DeleteAnimal() {

    const [animalId, setAnimalId] = useState("");

    const deleteAnimal = async (event) => {

        try {
            const token = localStorage.getItem("token");
            event.preventDefault();
            console.log("delete animal id --> " + animalId)
            const url = `http://localhost:8081/animal/delete-animal?id=${animalId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            if (response.ok) {

            } else {
                console.error("Błąd podczas usuwania zwierzaka:", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem:", error);
        }

    }

    // useEffect(() => {
    //     deleteAnimal();
    // }, [])

    return (
        <div className="container-delete-animal">
            <form className="form-delete-animal" onSubmit={deleteAnimal}>
                <h2 className="animal-header-delete-animal">Wybierz id:</h2>
                <div className="animal-box-delete-animal">
                    <div className="animal-delete-animal">

                        <div className="id-delete-animal">
                            <label className="label-id-delete-animal" htmlFor="id">Id:</label>
                            <input className="input-id-delete-animal" type="number" id="id" name="id"  value={animalId || ""}  onChange={event => setAnimalId(event.target.value)} required/>
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