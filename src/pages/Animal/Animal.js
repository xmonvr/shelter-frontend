import "./Animal.css"
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

export default function Animal() {

    const [animalInfo, setAnimalInfo] = useState("");
    const [animalImage, setAnimalImage] = useState("");
    const { id } = useParams();

    const getAnimalById = async () => {

        try {
            const url = `http://localhost:8081/animal/animal-by-id?id=${id}`;
            const response = await fetch(url);

            if (response.ok) {
                const info = await response.json();
                console.log("info: " + info.name)
                setAnimalInfo(info);
                console.log("name: ", animalInfo)
                console.log("image: ", )
            } else {
                console.error("Błąd podczas pobierania informacji o zwierzęciu: ", response.statusText);
                //todo dodać, że tylko  zalogowany uzytkownik moze wysylac formularz adopcyjny. wtedy po kliknięciu
                //"Adoptuj" przekierowuje na stronę logowania
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    };

    const getImageByAnimalId = async () => {
        try {
            const url = `http://localhost:8081/images/get-image-by-animalId?animalId=${id}`;
            const response = await fetch(url);
            console.log("id --> " + id);
            if (response.ok) {
                //dokumentacja https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch "Supplying your own request object"
                const image = await response.blob();
                const imageUrl = URL.createObjectURL(image);
                setAnimalImage(imageUrl);
            } else {
                console.error("Błąd podczas pobierania obrazu zwierzaka: ", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
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
                    <p>Id: {animalInfo.id}</p>
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