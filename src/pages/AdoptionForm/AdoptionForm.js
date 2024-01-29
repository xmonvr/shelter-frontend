import './AdoptionForm.css'
import {useParams} from "react-router-dom";
import {useState} from "react";
import {Popup} from "../../Popup";
import {questionsList} from "./questions";
import {ENDPOINTS} from "../../api/endpoints";
import axios from "axios";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export default function AdoptionForm() {
    const [isOpen, setIsOpen] = useState(false);

    const {id} = useParams();

    const {getItem} = useLocalStorage();

    const handleSubmit = async (event) => {
        const urlSend = `${ENDPOINTS.sendAdoptionForm}?animalId=${id}`;
        const urlPdf = `${ENDPOINTS.adoptionFormPdf}?animalId=${id}`;

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
                questions: {
                }
            };

        questionsList.forEach((question, i) => {
            data.questions[question] = formData.get(`${question}`);
        });

        if (event.nativeEvent.submitter.id === "submit-send") {
            await axios.post(urlSend, data, {
                headers: {
                    Authorization: getItem("token"),
                    "Content-Type": "application/json",
                }
            })
                .then(() => alert("Operacja wykonana"))
                .catch(() => setIsOpen(true));
        } else {
            await axios.post(urlPdf, data, {
                headers: {
                    Authorization: getItem("token"),
                    "Content-Type": "application/json",
                }
            })
                .then(() => alert("Operacja wykonana"))
                .catch(() => setIsOpen(true));
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
                        <label className="label-phone-number-adoption-form" htmlFor="phone-number">Numer telefonu:</label>
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
                        <input className="input-house-number-adoption-form" type="text" id="house-number" name="house-number" placeholder="dom/mieszkanie" required/>
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