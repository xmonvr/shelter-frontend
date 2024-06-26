import {useContext, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {AuthContext} from "../auth/AuthContext";
import axios from "axios";
import {ENDPOINTS} from "../api/endpoints";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
  const {user, setUser, setToken} = useContext(AuthContext);
  const {getItem, removeItem, setItem} = useLocalStorage();
  const navigate = useNavigate();

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
    setUser(user);
    setToken(token);
  };

  const logout = async () => {
    const token = getItem("token");

      await axios.post(ENDPOINTS.logout, {}, {
        headers: {
          "Authorization": token
        },
      }).then(() => {
        setUser(null);
        setToken(null);
        removeItem("token");
        removeItem("user");
        navigate("/login");
      }).catch(() => console.error("Błąd podczas komunikacji z serwerem."));

  };

  return {user, login, logout};
};