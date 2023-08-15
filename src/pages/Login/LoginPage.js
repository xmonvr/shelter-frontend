import './LoginPage.css';
import {Link, useNavigate} from "react-router-dom";
import {Popup} from "../../Popup";
import {useState} from "react";

export default function LoginPage({setLoggedIn}) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // Hook useHistory z react-router do obsługi historii przeglądarki

        try {                       // fetch(url, [options]);
            // + skladnia async / await
            const response = await fetch("http://localhost:8081/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const token = response.headers.get("Authorization");
                localStorage.setItem("token", token);
                setLoggedIn(true);
                navigate("/");
            } else {
                setIsOpen(true);
                console.error("Błąd podczas rejestracji:", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem:", error);
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="header-login">Logowanie</h2>
                <label className="label-username-login" for="username">Adres email:</label>
                <input className="input-email-login" type="email" id="username" name="email" required />
                <label className="label-password-login" for="password">Hasło:</label>
                <input className="input-password-login" type="password" id="password" name="password" required />
                <input className="input-submit-login" type="submit" value="Zaloguj się" />
                {isOpen ? <Popup message="Nieprawidłowy login lub hasło" close={() => setIsOpen(false)} /> : null}
                <div className="register-button-login">
                <pre>Nie masz konta? Zarejestruj się </pre>
                <Link to="/register" >
                    tutaj.
                </Link>
            </div>
            </form>
            
        </div>
    )
}