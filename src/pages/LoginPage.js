import './LoginPage.css';
import {Link, useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // Hook useHistory z react-router do obsługi historii przeglądarki

        try {                       // fetch(url, [options]);
            // + skladnia async / await
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Jeśli odpowiedź jest OK, można wykonać odpowiednie akcje na froncie, np. wyświetlić komunikat o powodzeniu
                navigate("/");
                // console.log("Rejestracja udana!");
            } else {
                // Jeśli odpowiedź nie jest OK, można obsłużyć błędy, np. wyświetlić komunikat o niepowodzeniu
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