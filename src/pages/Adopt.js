import {Link} from "react-router-dom";
import React, {useEffect} from 'react';
import {useState} from "react";
import "./Adopt.css"
import dog1Image from "./photo/pies1.jpg";

export default function Adopt() {

    return (<div className="adopt">
        <AnimalList />
    </div>);
}
// reactowe komponenty
function AnimalList() {     //komponent
    const [animalsList, setAnimalsList] = useState([]);     //używamy hooka useState do przechowywania listy zwierzat w stanie komponentu AnimalList
    const [ageMin, setAgeMin] = useState("");
    const [ageMax, setAgeMax] = useState("");
    const [gender, setGender] = useState("");
    const [typeOfAnimal, setTypeOfAnimal] = useState("");

    useEffect(() => {
        getAnimalsList();
    }, []);

    const getAnimalsList = async (event) => {
        const data = {
            ageMin: ageMin || "",
            ageMax: ageMax || "",
            gender: gender || "",
            typeOfAnimal: typeOfAnimal || ""
        }

        const params = new URLSearchParams(data);
        const queryString = params.toString();

        try {
            const url = `http://localhost:8081/animal/filtered-animals?${queryString}`;
            const response = await fetch(url);

            if (response.ok) {
                const animals = await response.json();
                setAnimalsList(animals);
            } else {
                console.error("Błąd podczas pobierania listy zwierząt:", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem:", error);
        }

    }

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
                <select className="select-typeOfAnimal" name="typeOfAnimal" id="select-typeOfAnimal" value={typeOfAnimal || ""} onChange={(event) => setTypeOfAnimal(event.target.value)}>
                    <option value="">---</option>
                    <option value="DOG">PIES</option>
                    <option value="CAT">KOT</option>
                    <option value="OTHER">INNE</option>
                </select>
                <input className="input-submit-filtration" type="button" value="Szukaj" onClick={getAnimalsList}/>
            </form>
        <div className="animal">
            <div className="animal-box">
                {animalsList.map(animal => (
                    <Link to={`/animal/${animal.id}`} key={animal.id} className="animal-img">
                        <img src={dog1Image} alt={animal.name} />
                        <p>{animal.name}</p>
                    </Link>
                ))}
            </div>
        </div>
        </div>
    );
}