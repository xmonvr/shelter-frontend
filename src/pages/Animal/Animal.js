import "./Animal.css"
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {ENDPOINTS} from "../../api/endpoints";

export default function Animal() {

    const [animalInfo, setAnimalInfo] = useState("");
    const [animalImage, setAnimalImage] = useState("");
    const {id} = useParams();

    const getAnimalById = async () => {

        try {
            const url = ENDPOINTS.animal + `?id=${id}`;
            const response = await axios.get(url);

            if (!response.data) {
                return console.error(
                    "Błąd podczas pobierania pobierania danych zwierzęcia: ",
                    response.statusText
                );
            }
            setAnimalInfo(response.data);
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    };

    const getImageByAnimalId = async () => {
        try {
            const url = ENDPOINTS.animalImage + `?animalId=${id}`;
            const response = await axios.get(url, {responseType: "arraybuffer"}); //params - klucz

            if (!response.data) {
                return console.error(
                    "Błąd podczas pobierania obrazu zwierzaka: ",
                    response.statusText
                );
            }

            const blob = new Blob([response.data]);
            const imageUrl = URL.createObjectURL(blob);
            setAnimalImage(imageUrl);
        } catch {
            console.error("Błąd podczas komunikacji z serwerem: ");
        }
    };

    const convertTypeOfAnimal = (typeOfAnimal) => {
        if (typeOfAnimal === "CAT" )
            return "kot";
        else if (typeOfAnimal === "DOG")
            return "pies";
        else
            return "inne";
    }

    useEffect(() => {
        getAnimalById();
        getImageByAnimalId();
    }, []);

    return (
        <div className="animal-animal">
            <div className="leftside-animal">
                <img src={animalImage} alt="animal" className="photo-animal"/>
            </div>
            <div className="rightside-animal">
                <div className="info-animal">
                    <p>Imię: {animalInfo.name}</p>
                    <p>Typ: {convertTypeOfAnimal(animalInfo.typeOfAnimal)} </p>
                    <p>Płeć: {animalInfo.gender}</p>
                    <p>Wiek: {animalInfo.age}</p>
                    <p>ID: {animalInfo.id}</p>
                    <p>Opis: {animalInfo.description}</p>
                </div>
                <div className="buttons-animal">
                    <Link to={`/adoption-form/${id}`} className="adoption-form-animal">
                        Adoptuj
                    </Link>
                    <Link to={`/donate/${id}`} className="virtual-adoption-animal">
                        Adoptuj wirtualnie
                    </Link>
                </div>
            </div>
        </div>
    )
}