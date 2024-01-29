import './EditAnimal.css';
import {useState} from "react";
import axios from "axios";
import {ENDPOINTS} from "../../../api/endpoints";
import {useLocalStorage} from "../../../hooks/useLocalStorage";

export default function EditAnimal() {
    const {getItem} = useLocalStorage();

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");
    const [gender, setGender] = useState("");
    const [chipNumber, setChipNumber] = useState("");
    const [isVaccinated, setIsVaccinated] = useState(false);
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        const token = getItem("token");
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", id || null);
        formData.append("name", name || "");
        formData.append("typeOfAnimal", typeOfAnimal || "");
        formData.append("chipNumber", chipNumber || "");
        formData.append("gender", gender || "");
        formData.append("isVaccinated", isVaccinated || false);
        formData.append("age", age || "");
        formData.append("description", description || "");
        formData.append("image", image || null);

        const url =  ENDPOINTS.editAnimal;
        const response = await axios.put(url, formData, {
                headers: {
                    "Authorization": token
                },
            });
    }

    return (
        <div className="container-edit-animal">
            <form className="form-edit-animal" onSubmit={handleSubmit}>
                <h2 className="animal-info-header-edit-animal">Dane zwierzaka</h2>
                <div className="animal-box-edit-animal">
                    <div className="animal-info-edit-animal">
                        <div className="id-edit-animal">
                            <label className="label-id-edit-animal" htmlFor="id">ID:</label>
                            <input className="input-id-edit-animal" type="number" id="id" name="id" value={id} onChange={(event) => setId(event.target.value)} required/>
                        </div>
                        <div className="name-edit-animal">
                            <label className="label-name-edit-animal" htmlFor="name">Imię:</label>
                            <input className="input-name-edit-animal" type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="type-of-animal-edit-animal">
                            <label className="label-type-of-animal-edit-animal" htmlFor="typeOfAnimal">Typ:</label>
                            <select className="select-type-of-animal-edit-animal" type="text" id="typeOfAnimal" name="typeOfAnimal" value={typeOfAnimal} onChange={(event) => setTypeOfAnimal(event.target.value)}>
                                <option value="">---</option>
                                <option value="DOG">PIES</option>
                                <option value="CAT">KOT</option>
                                <option value="OTHER">INNE</option>
                            </select>
                        </div>
                        <div className="gender-edit-animal">
                            <label className="label-gender-edit-animal" htmlFor="gender">Płeć:</label>
                            <select className="select-gender-edit-animal"  id="gender" name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
                                <option value="">---</option>
                                <option value="ON">ON</option>
                                <option value="ONA">ONA</option>
                            </select>
                        </div>
                        <div className="chip-number-edit-animal">
                            <label className="label-chip-number-edit-animal" htmlFor="chipNumber">Numer chip:</label>
                            <input className="input-chip-number-edit-animal" type="number" id="chipNumber" name="chipNumber" value={chipNumber} onChange={(event) => setChipNumber(event.target.value)}/>
                        </div>
                        <div className="vaccinated-edit-animal">
                            <label className="label-vaccinated-edit-animal" htmlFor="isVaccinated">Szczepienie:</label>
                            <select className="select-vaccinated-edit-animal"  id="isVaccinated" name="isVaccinated" value={isVaccinated} onChange={(event) => setIsVaccinated(event.target.value)}>
                                <option value="">---</option>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </select>
                        </div>
                        <div className="age-edit-animal">
                            <label className="label-age-edit-animal" htmlFor="age">Wiek:</label>
                            <input className="input-age-edit-animal" type="number" id="age" name="age" value={age} onChange={(event) => setAge(event.target.value)}/>
                        </div>
                        <div className="image-edit-animal">
                            <label className="label-image-edit-animal" htmlFor="image">Zdjęcie:</label>
                            <input className="input-image-edit-animal" type="file" id="image" name="image" onChange={(event) => setImage(event.target.files[0])}/>
                        </div>
                    </div>
                    <div className="description-edit-animal">
                        <label className="label-description-edit-animal" htmlFor="description">Opis:</label>
                        <input className="input-description-edit-animal" type="text" id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </div>
                    <div className="button-edit-animal">
                        <input className="input-send-edit-animal" type="submit" id="submit" value="Dodaj" />
                    </div>
                </div>
            </form>
        </div>
    )
}