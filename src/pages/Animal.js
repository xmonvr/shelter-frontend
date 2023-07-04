import "./Animal.css"
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import dog1Image from "./photo/pies1.jpg";

export default function Animal() {

    const [animalInfo, setAnimalInfo] = useState("");
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
            } else {
                console.error("Błąd podczas pobierania informacji o zwierzęciu: ", response.statusText);
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
    }, []);

    return (
        <div className="animal-animal">
            <div className="leftside-animal">
                <img src={dog1Image} alt="animal" className="photo-animal"/>
            </div>
            <div className="rightside-animal">
                <div className="info-animal">
                    <p>Imię: {animalInfo.name}</p>
                    <p>Typ: {convertTypeOfAnimal(animalInfo.typeOfAnimal)} </p>
                    <p>Płeć: {animalInfo.gender}</p>
                    <p>Wiek: {animalInfo.age}</p>
                    <p>Opis: {animalInfo.name} jest młodym ?? o takim i takim charakterze. Uwielbia inne zwierzęta, jest przyjazny. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur,
                    debitis dolor dolorum eligendi eos est fuga id, iste laborum libero magnam nam numquam quasi quia sequi, ullam voluptates! Accusantium, blanditiis doloribus hic illo
                    tenetur voluptatum? Consequatur ipsa, obcaecati. Animi cumque, enim est et eveniet explicabo facere facilis ipsa iste itaque iusto nam natus necessitatibus nemo
                    nostrum obcaecati porro quae, quisquam quos saepe sequi sint veritatis? Ad doloremque dolores hic mollitia natus necessitatibus nesciunt nisi officiis? Adipisci animi
                    doloribus eos illum quia repellendus sit. Adipisci amet consequuntur expedita sequi! Cum, ducimus eos harum ipsum minus quasi rerum tenetur. Dolor, excepturi praesentium?</p>
                </div>
                <div className="buttons-animal">
                    <Link to={`/adoption-form/${id}`} className="adoption-form-animal">
                        Adoptuj
                    </Link>
                    <Link to="/donate" className="virtual-adoption-animal">     {/*todo link bedzie zawieral id zwierzecia i tytul przelewu bedzie zawoeral id konkretnego zwierzecia*/}
                        Adoptuj wirtualnie
                    </Link>
                </div>
            </div>
        </div>
    )
}