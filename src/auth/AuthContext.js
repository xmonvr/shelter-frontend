import {createContext, useCallback, useMemo, useState} from "react";

export const AuthContext = createContext({
  user: null,
  token: "",
  setUser: () => {},
  setToken: () => {},
});

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = useCallback((user) => {
    setUser(user);
  }, []);
  //pusta tablica [] zostanie zapamiętana na stałe

  const handleSetToken = useCallback((newToken) => {
    setToken(newToken);
  }, []);

  const contextValue = useMemo(() => ({
        user,
        token,
        setUser: handleLogin,
        setToken: handleSetToken}),
      [user, token, handleLogin, handleSetToken]
  );

  return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};