import './AdoptionForm.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Popup} from "../../Popup";

export default function AdoptionForm() {
    const [isOpen, setIsOpen] = useState(false);


    const { id } = useParams();
    const [questionsList, setQuestionsList] = useState([
        "Czemu zdecydował/a się Pan/i na akurat to zwierzę?",
        "Jaki jest metarz mieszkania/domu, w którym zamieszka zwierzę?",
        "Ile osób zamieszkuje mieszkanie/dom?",
        "Czy mieszkanie/dom zamieszkują dzieci? Jeśli tak, prosze podać wiek.",
        "Czy mieszkanie/dom zamieszkują inne zwierzęta? Jeśli tak proszę podać jakie zwierzęta",
        "Czy któryś z mieszkańców ma uczulenie na sierść lub ślinę?",
        "Czy posiada Pan/Pani podwórko? Jeśli tak, proszę podać metrarz.",
        "Czy reszta mieszkańców posiadłości wie o adopcji? Czy wyrażają na nią zgodę?",
        "Co zrobi Pan/i z zwierzęciem podczas dłuższej nieobecności wszystkich dorosłych mieszkańców? (np. wakacje, delegacja, wyjazd na weekend itd.)",
        "Jak często zwierzę będzie wychodziło na spacery?",
        "Czy zwierzę będzie zostawało samo w domu? Na ile godzin dziennie średnio?",
        "Gdzie będzie przebywało zwierzę podczas krótkiej (np. wyjście do pracy) nieobecności domowników? (proszę wziąć pod uwagę, że \"samo w mieszkaniu\" nie jest niepoprawną odpowiedzią)",
        "Czy przygotowałeś już miejsce dla zwierzaka? W zależności od zwierzaka - np. kojec na podwórku/ buda/ legowisko/ terrarium" +
        "miska itd. Opisz to, co przygotowałeś na przybycie zwierzaka" ,
        "Gdzie i jak zwierzę będzie spędzało swój czas." +
        "Opisz np. gdzie zwierzę będzie spało, gdzie będzie spędzało swój dzień?",
        "Czy bierzesz na siebie odpowiedzialność za utrzymanie zwierzaka." +
        "W te koszty wchodzą m.in.: obowiązkowe szczepienia co roku u weterynarza, zakup odpowiedniej karmy," +
        "wymiana zużytych zwierzęcych akcesoriów (np. buda, legowisko, smycz)",
        "Jak zamierzasz zabezpieczyć zwierzę przed kleszczami i pchłami?"
    ]);

    const handleSubmit = async (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data =
            {
                adopter: {
                    firstName: formData.get("first-name"),
                    lastName: formData.get("last-name"),
                    phoneNumber: formData.get("phone-number"),
                    email: formData.get("email"),
                    address: {
                        street: formData.get("street"),
                        houseNumber: formData.get("house-number"),
                        city: formData.get("city"),
                        zipCode: formData.get("zip-code"),
                        country: formData.get("country")
                    },
                    dateOfBirth: formData.get("date-of-birth")
                },
                animal: {
                    name: formData.get("name"),
                    typeOfAnimal: formData.get("type-of-animal"),
                    chip_number: formData.get("chip-number"),
                    gender: formData.get("gender"),
                    isVaccinated: formData.get("vaccinated"),
                    age: formData.get("age")
                },
                questions: {
                }
            };

        questionsList.forEach((question, i) => {
            data.questions[question] = formData.get(`${question}`);
        });
        console.log("question list 1" + questionsList);

        if (event.nativeEvent.submitter.id === "submit-send") {
            try {
                const response = await fetch(`http://localhost:8081/adoptions/send-adoption-form?animalId=${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {

                } else {
                    setIsOpen(true);
                    console.error("Błąd:", response.statusText);
                }
            } catch (error) {
                console.error("Błąd:", error);
            }
        } else {
            try {
                const response = await fetch(`http://localhost:8081/adoptions/adoption-form-pdf?animalId=${id}`, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {

                } else {
                    setIsOpen(true);
                    console.error("Błąd:", response.statusText);
                }
            } catch (error) {
                console.error("Błąd:", error);
            }
        }
    }

    return (
        <div className="container-adoption-form">
            <form className="form-adoption-form" onSubmit={handleSubmit}>
                <h2 className="personal-info-header-adoption-form">Dane personalne</h2>
                <small className="small-adoption-form">Dane osoby, która zostanie właścicielem zwierzęcia</small>
                <div className="personal-info-adoption-form">
                    <div className="first-name-adoption-form">
                        <label className="label-first-name-adoption-form" htmlFor="first-name">Imię:</label>
                        <input className="input-first-name-adoption-form" type="text" id="first-name" name="first-name" required/>
                    </div>
                    <div className="last-name-adoption-form">
                        <label className="label-last-name-adoption-form" htmlFor="last-name">Nazwisko:</label>
                        <input className="input-last-name-adoption-form" type="text" id="last-name" name="last-name" required/>
                    </div>
                    <div className="phone-number-adoption-form">
                        <label className="label-phone-number-adoption-form" htmlFor="phone-number">Numer telefonu:</label>      {/*jest takie cos jak react-phone-number-input*/} {/*Zrodlo: https://www.w3schools.com/tags/att_input_type_tel.asp*/}
                        <input className="input-phone-number-adoption-form" type="tel" id="phone-number" name="phone-number" placeholder="123456789" pattern="[0-9]{9}" required/>
                    </div>
                    <div className="email-adoption-form">
                        <label className="label-email-adoption-form" htmlFor="email">Adres email:</label>
                        <input className="input-email-adoption-form" type="email" id="email" name="email" required/>
                    </div>
                    <div className="date-of-birth-adoption-form">
                        <label className="label-date-of-birth-adoption-form" htmlFor="date-of-birth">Data urodzenia:</label>
                        <input className="input-date-of-birth-adoption-form" type="date" id="date-of-birth" name="date-of-birth" required/>
                    </div>
                    <div className="street-adoption-form">
                        <label className="label-street-adoption-form" htmlFor="street">Ulica:</label>
                        <input className="input-street-adoption-form" type="text" id="street" name="street" required/>
                    </div>
                    <div className="house-number-adoption-form">
                        <label className="label-house-number-adoption-form" htmlFor="house-number">Nr domu:</label>
                        <input className="input-house-number-adoption-form" type="text" id="house-number" name="house-number" placeholder="dom/mieszkanie" required/>        {/*//to moze zostac jako tekst, bo numer domu moze wygladac 4a m.7*/}
                    </div>
                    <div className="city-adoption-form">
                        <label className="label-city-adoption-form" htmlFor="city">Miasto:</label>
                        <input className="input-city-adoption-form" type="text" id="city" name="city" required/>
                    </div>
                    <div className="zip-code-adoption-form">
                        <label className="label-zip-code-adoption-form" htmlFor="zip-code">Kod pocztowy:</label>
                        <input className="input-zip-code-adoption-form" type="text" id="zip-code" name="zip-code" placeholder="00-000" pattern="[0-9]{2}-[0-9]{3}" required/>
                    </div>
                    <div className="country-adoption-form">
                        <label className="label-country-adoption-form" htmlFor="country">Kraj:</label>
                        <input className="input-country-adoption-form" type="text" id="country" name="country" required/>
                    </div>
                </div>
               {/* <h2 className="animal-info-header-adoption-form">Dane zawirzaka</h2>
                <small className="small-animal-adoption-form">Dane zwierzęcia do adopcji</small>
                <div className="animal-info-adoption-form">
                    <div className="name-adoption-form">
                        <label className="label-name-adoption-form" htmlFor="name">Imię:</label>
                        <input className="input-name-adoption-form" type="text" id="name" name="name" required/>
                    </div>
                    <div className="type-of-animal-adoption-form">
                        <label className="label-type-of-animal-adoption-form" htmlFor="type-of-animal">Typ:</label>
                        <input className="input-type-of-animal-adoption-form" type="text" id="type-of-animal" name="type-of-animal" required/>
                    </div>
                    <div className="chip-number-adoption-form">
                        <label className="label-chip-number-adoption-form" htmlFor="chip-number">Numer chip:</label>
                        <input className="input-chip-number-adoption-form" type="number" id="chip-number" name="chip-number" required/>
                    </div>
                    <div className="vaccinated-adoption-form">
                        <label    className="label-vaccinated-adoption-form" htmlFor="vaccinated">Szczepienie:</label>
                        <input className="input-vaccinated-adoption-form" type="text" id="vaccinated" name="vaccinated" required/>
                    </div>
                    <div className="age-adoption-form">
                        <label className="label-age-adoption-form" htmlFor="age">Wiek:</label>
                        <input className="input-age-adoption-form" type="number" id="age" name="age" required/>
                    </div>
                </div>*/}
                <h2 className="questions-header-adoption-form">Ankieta</h2>
                <small className="small-questions-adoption-form">Odpowiadaj na pytania szczerze, nie zatajaj faktów. Ankieta służy nam do zbadnia warunków, w które zostaną oddane zwierzęta.
                    Tobie służy przemyśleniu, czy jesteś gotów wziąć odpowiedzialność za zwierzę.</small>
                <div className="questions-adoption-form">
                    <div className="questions-box-adoption-form">
                        {questionsList.map((item) => (
                            <div className="question-adoption-form" key={item}>
                                <label className="label-question-adoption-form" htmlFor={item}>{item}</label>
                                <textarea className="input-question-adoption-form" type="text" id={item} name={item} rows={4} maxLength={700} required/>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="buttons-adoption-form">
                    <input className="input-send-adoption-form" type="submit" id="submit-send" value="Wyślij zgłoszenie"/>
                    {isOpen ? <Popup message="Zaloguj się, aby wysłać formularz" close={() => setIsOpen(false)} /> : null}
                    <div className="button-send-adoption-form"></div>
                    <input className="input-download-adoption-form" type="submit" id="submit-download" value="Pobierz zgłoszenie"/>
                    {isOpen ? <Popup message="Zaloguj się, aby pobrać formularz" close={() => setIsOpen(false)} /> : null}
                    <div className="button-download-adoption-form"></div>
                </div>
            </form>
        </div>
    )
}