import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {ENDPOINTS} from "../../api/endpoints";

export function AnimalList() {

    const [ageMin, setAgeMin] = useState("");
    const [ageMax, setAgeMax] = useState("");
    const [gender, setGender] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");
    const [animalImages, setAnimalImages] = useState({});
    const [animalsList, setAnimalList] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const typeFilter = queryParams.get("type");

    const getAnimals = async (event) => {
        let data = {};

        if (typeFilter === "DOG") {
            data = {
                ageMin: ageMin || "",
                ageMax: ageMax || "",
                gender: gender || "",
                typeOfAnimal: typeOfAnimal || "DOG",
            };
        } else if (typeFilter === "CAT") {
            data = {
                ageMin: ageMin || "",
                ageMax: ageMax || "",
                gender: gender || "",
                typeOfAnimal: typeOfAnimal || "CAT",
            };
        } else {
            data = {
                ageMin: ageMin || "",
                ageMax: ageMax || "",
                gender: gender || "",
                typeOfAnimal: typeOfAnimal || "",
            };
        }

        try {
            const url = ENDPOINTS.filteredAnimals + `?ageMin=${data.ageMin}&ageMax=${data.ageMax}&gender=${data.gender}&typeOfAnimal=${data.typeOfAnimal}`;
            const response = await axios.get(url);
            setAnimalList(response.data);
        } catch(error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    };

    useEffect(() => {
        if (animalsList && animalsList.length > 0) {
            animalsList.forEach((animal) => {
                getImageByAnimalId(animal.id);
            });
        }
    }, [animalsList]);

    const getImageByAnimalId = async (animalId) => {
        try {
            const url = ENDPOINTS.animalImage + `?animalId=${animalId}`;
            const response = await axios.get(url, {responseType: "arraybuffer"});
            const blob = new Blob([response.data]);
            const imageUrl = URL.createObjectURL(blob);

            setAnimalImages((prevAnimalImages) => ({
                ...prevAnimalImages,
                [animalId]: imageUrl,
            }));
        } catch {
            console.error("Błąd podczas komunikacji z serwerem: ");
        }
    };

    useEffect(() => {
        getAnimals();
    }, []);

    return (
        <div>
            <form className="animal-filtration-form">
                <label className="label-ageMin-filtration" htmlFor="ageMin">Wiek:</label>
                <input className="input-ageMin-filtration" type="number" id="ageMin" name="ageMin" value={ageMin || ""} onChange={(event) => setAgeMin(event.target.value)}/>
                <label className="label-ageMax-filtration" htmlFor="ageMax">-</label>
                <input className="input-ageMax-filtration" type="number" id="ageMax" name="ageMax" value={ageMax || ""} onChange={(event) => setAgeMax(event.target.value)}/>
                <label className="label-gender-filtration" htmlFor="gender">Płeć:</label>
                <select className="select-gender" name="gender" id="select-gender" value={gender || ""} onChange={(event) => setGender(event.target.value)}>
                    <option value="">---</option>
                    <option value="ON">ON</option>
                    <option value="ONA">ONA</option>
                </select>
                <label className="label-typeOfAnimal-filtration" htmlFor="typeOfAnimal">Typ:</label>
                <select className="select-typeOfAnimal" name="typeOfAnimal" id="select-typeOfAnimal" value={typeOfAnimal || " "} onChange={(event) => setTypeOfAnimal(event.target.value)}>
                    <option value="">---</option>
                    <option value="DOG">PIES</option>
                    <option value="CAT">KOT</option>
                    <option value="OTHER">INNE</option>
                </select>
                <input className="input-submit-filtration" type="button" value="Szukaj" onClick={getAnimals}/>
            </form>
            <div className="animal">
                <div className="animal-box">{animalsList && animalsList.map((animal) => (
                        <Link to={`/animal/${animal.id}`} key={animal.id} className="animal-img">
                            <img src={animalImages[animal.id]} alt={animal.name} />
                            <p>{animal.name}</p>
                        </Link>
                ))}
                </div>
            </div>
        </div>
    );
}