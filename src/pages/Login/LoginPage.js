import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/auth";
import {Popup} from "../../Popup";
import axios from "axios";
import {ENDPOINTS} from "../../api/endpoints";

export function LoginPage() {
    const [isOpen, setIsOpen] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        const url = ENDPOINTS.login;
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //pobranie tokena z odpowiedzi logowania
            const token = response.headers.get("Authorization");
            // jesli token nie jest null/undefined/false, to wywolaj funkcje login() z useAuth i przekaz token z headera
            token && login(token);
            navigate("/");
        } catch (error) {
            setIsOpen(true);
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="header-login">Logowanie</h2>
                <label className="label-username-login" for="username">Adres email:</label>
                <input className="input-email-login" type="email" id="username" name="email" required />
                <label className="label-password-login" for="password">Hasło:</label>
                <input className="input-password-login" type="password" id="password" name="password" required />
                <input className="input-submit-login" type="submit" value="Zaloguj się" />
                {isOpen ? (<Popup message="Nieprawidłowy login lub hasło" close={() => setIsOpen(false)} />) : null}
                <div className="register-button-login">
                    <pre>Nie masz konta? Zarejestruj się </pre>
                    <Link to="/register">tutaj.</Link>
                </div>
            </form>
        </div>
    );
}