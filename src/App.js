import './App.css';
import Navbar from "./Components/Navbar";
import React, { useState } from 'react';
import {Router} from "./Components/Router";
import axios from "axios";
import {BASE_URL} from "./api/endpoints";

axios.defaults.baseURL = BASE_URL;
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    const setLoggedIn = (value) => {        //definicja funkcji przyjmujacej jedna wartosc value
        setIsLoggedIn(value);
    };
  return (
      <>         {/*(<> ... </>) to specjalny rodzaj komponentu, który pozwala na zgrupowanie wielu elementów bez dodawania dodatkowego niepotrzebnego kontenera DOM*/}
        <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} userRole={userRole} setUserRole={setUserRole}/>
        <div className="pageContainer">
            <Router/>
        </div>
      </>
  )
}
export default App;

