import './CreateAnimal.css';
import {useState} from "react";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import {ENDPOINTS} from "../../../api/endpoints";
import axios from "axios";

export default function CreateAnimal() {

    const [name, setName] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");
    const [gender, setGender] = useState("");
    const [chipNumber, setChipNumber] = useState("");
    const [isVaccinated, setIsVaccinated] = useState(false);
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const {getItem} = useLocalStorage();

    const handleSubmit = async (event) => {
        const token = getItem("token");
        const url = ENDPOINTS.createAnimal;
        event.preventDefault();
        const formData = new FormData();        //form data jest odpowiednie dla dane + obraz
        formData.append("name", name);    //Jeśli name jest prawdziwe (nie jest null, undefined itp.), to przypisuje wartość name, w przeciwnym razie przypisuje pusty ciąg znaków "".
        formData.append("typeOfAnimal", typeOfAnimal || "");
        formData.append("chipNumber", chipNumber);
        formData.append("gender", gender);
        formData.append("isVaccinated", isVaccinated);
        formData.append("age", age);
        formData.append("description", description);
        formData.append("image", image);
        const response = await axios.post(url, formData,
            {
                headers: {
                    Authorization: token,
                }
            });
    }

    return (
        <div className="container-create-animal">
            <form className="form-create-animal" onSubmit={handleSubmit}>
                <h2 className="animal-info-header-create-animal">Dane zwierzaka</h2>
                <div className="animal-box-create-animal">
                    <div className="animal-info-create-animal">

                        <div className="name-create-animal">
                            <label className="label-name-create-animal" htmlFor="name">Imię:</label>
                            <input className="input-name-create-animal" type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required/>
                        </div>

                        <div className="type-of-animal-create-animal">
                            <label className="label-type-of-animal-create-animal" htmlFor="typeOfAnimal">Typ:</label>
                            <select className="select-type-of-animal-create-animal" type="text" id="typeOfAnimal" name="typeOfAnimal" value={typeOfAnimal} onChange={(event) => setTypeOfAnimal(event.target.value)} required>
                                <option value="">---</option>
                                <option value="DOG">PIES</option>
                                <option value="CAT">KOT</option>
                                <option value="OTHER">INNE</option>
                            </select>
                        </div>

                        <div className="gender-create-animal">
                            <label className="label-gender-create-animal" htmlFor="gender">Płeć:</label>
                            <select className="select-gender-create-animal" type="text" id="gender" name="gender" value={gender} onChange={(event) => setGender(event.target.value)} required>
                                <option value="">---</option>
                                <option value="ON">ON</option>
                                <option value="ONA">ONA</option>
                            </select>
                        </div>

                        <div className="chip-number-create-animal">
                            <label className="label-chip-number-create-animal" htmlFor="chipNumber">Numer chip:</label>
                            <input className="input-chip-number-create-animal" type="number" id="chipNumber" name="chipNumber" value={chipNumber} onChange={(event) => setChipNumber(event.target.value)} required/>
                        </div>

                        <div className="vaccinated-create-animal">
                            <label className="label-vaccinated-create-animal" htmlFor="isVaccinated">Szczepienie:</label>
                            <select className="select-vaccinated-create-animal" type="text" id="isVaccinated" name="isVaccinated" value={isVaccinated} onChange={(event) => setIsVaccinated(event.target.value)} required>
                                <option value="">---</option>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </select>
                        </div>

                        <div className="age-create-animal">
                            <label className="label-age-create-animal" htmlFor="age">Wiek:</label>
                            <input className="input-age-create-animal" type="number" id="age" name="age" value={age} onChange={(event) => setAge(event.target.value)} required/>
                        </div>
                    </div>
                    <div className="description-create-animal">
                        <label className="label-description-create-animal" htmlFor="description">Opis:</label>
                        <input className="input-description-create-animal" type="text" id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} required/>
                    </div>
                    <div className="image-create-animal">
                        <label className="label-image-create-animal" htmlFor="image">Zdjęcie:</label>
                        <input className="input-image-create-animal" type="file" id="image" name="image" onChange={(event) => setImage(event.target.files[0])} required/>
                    </div>
                    <div className="button-create-animal">
                        <input className="input-send-create-animal" type="submit" id="submit" value="Dodaj" />
                        <div className="button-send-create-animal"></div>
                    </div>
                </div>
            </form>
        </div>
    )
}