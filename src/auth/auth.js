import {useContext, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {AuthContext} from "../auth/AuthContext";

export const useAuth = () => {
  const {user, setUser, setToken} = useContext(AuthContext);    // destrukturyzacja
  const {getItem, removeItem, setItem} = useLocalStorage();

  //wczytanie tokena oraz informacje o zalogowanym userze po przeladowaniu strony
  useEffect(() => {
    const userToken = getItem("token");

    if (!userToken) return;

    login(userToken);
  }, []);

  const login = (token) => {
    const fixedUserToken = token && token.replace("Bearer ", "");
    const decodedUserToken = jwt_decode(fixedUserToken);

    const user = {
      role: decodedUserToken.authorities[0].authority,
    };

    setItem("token", token);
    setItem("user", JSON.stringify(user));

    //zapisanie do contextu
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    //czyszczenie stanu contextu
    setUser(null);
    removeItem("token");
  };

  return {user, login, logout};
};