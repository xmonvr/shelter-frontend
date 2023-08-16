import './Registration.css'
import {useNavigate} from 'react-router-dom'
import {ENDPOINTS} from "../../api/endpoints";
import axios from "axios";

export default function Registration() {

    const navigate = useNavigate();

    const handleRegistration = async (event) => {
        const url = ENDPOINTS.registration;
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            navigate("/login");
        }).catch(() => <p>Błąd podczas komunikacji z serwerem.</p>);
    }

    return (
        <div className="registration-page">
            <form className="registration-form" onSubmit={handleRegistration}>
                    <h2 className="header-registration">Rejestracja</h2>
                     <div className="email">
                        <label className="label-email-registration" for="email">Adres email:</label>
                        <input className="input-email-registration" type="email" id="email" name="email" required />
                     </div>

                     <div className="password">
                        <label className="label-password-registration" for="password">Hasło:</label>
                        <input className="input-password-registration" type="password" id="password" name="password" required />
                    {/* </div> */}

                    {/* <div className="confirm_password"> */}
                        <label className="label-confirm-pswd-registration" for="confirm-password">Powtórz hasło:</label>
                        <input className="input-confirm-pswd-registration" type="password" id="confirmPassword" name="confirm-password" required />
                     </div>

                    <div className="name">
                        <label className="label-first-name-registration" for="first-name">Imię:</label>
                        <input className="input-first-name-registration" type="text" id="first-name" name="firstName" required />
                    {/* </div> */}
                
                    {/* <div className="last_name"> */}
                        <label className="label-last-name-registration" for="last-name">Nazwisko:</label>
                        <input className="input-last-name-registration" type="text" id="last-name" name="lastName" required />
                    </div>
                
                     <div className="birth_date">
                        <label className="label-birth-date-registration" for="birth-date">Data urodzenia:</label>
                        <input className="input-birth-date-registration" type="date" id="birth-date" name="birthDate" required />
                     </div>

                    {/* <div className="policy"> */}
                        <label className="label-checkbox-registration">
                            <input type="checkbox" name="checkbox" id="checkbox" required/>
                            &nbsp;Zakładając konto wyrażasz zgodę na warunki i politykę.
                        </label>
                    {/* </div> */}
                
                    <input className="input-submit-registration" type="submit" value="Zarejestruj się" />
                    <div className="register-button-registration"></div>
            </form>
        </div>
    )
}