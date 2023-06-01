import './App.css';
import Navbar from "./Components/Navbar";
import Adopt from "./pages/Adopt";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"
import {Route, Routes} from "react-router-dom";
import Registration from './pages/Registration';
import { useState } from 'react';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const setLoggedIn = (value) => {        //definicja funkcji przyjmujacej jedna wartosc value
        setIsLoggedIn(value);
    };
  return (
      <>
        <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
        <div className="pageContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </div>
      </>
  )
}
export default App;

