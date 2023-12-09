import {useContext, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {AuthContext} from "../auth/AuthContext";
import axios from "axios";
import {ENDPOINTS} from "../api/endpoints";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
  const {user, setUser, setToken} = useContext(AuthContext);    // destrukturyzacja
  const {getItem, removeItem, setItem} = useLocalStorage();
  const navigate = useNavigate();

  //wczytanie tokena oraz informacje o zalogowanym userze po przeladowaniu strony
  useEffect(() => {
    const userToken = getItem("token");

    if (!userToken) return;

    login(userToken);
  }, []);

  const login = (token) => {
    const cleanUserToken = token && token.replace("Bearer ", "");
    const decodedUserToken = jwt_decode(cleanUserToken);

    const user = {
      role: decodedUserToken.authorities[0].authority,
    };

    setItem("token", token);
    setItem("user", JSON.stringify(user));

    //zapisanie do contextu
    setUser(user);
    setToken(token);
  };

  const logout = async () => {
    const token = getItem("token");
    //czyszczenie stanu contextu

      await axios.post(ENDPOINTS.logout, {}, {
        headers: {
          "Authorization": token
        },
      }).then(() => {
        setUser(null);
        setToken(null);
        removeItem("token");
        removeItem("user")
        navigate("/login");
      }).catch(() => <p>Błąd podczas komunikacji z serwerem.</p>);

  };

  return {user, login, logout};
};