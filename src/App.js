import './App.css';
import Navbar from "./Components/Navbar";
import Adopt from "./pages/Adopt";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"
import {Route, Routes} from "react-router-dom";
import Registration from './pages/Registration';
import { useState } from 'react';
import Animal from "./pages/Animal";
import AdoptionForm from "./pages/AdoptionForm/AdoptionForm";
import AdministrationPage from "./pages/admin/AdministrationPage";
import CreateAnimal from "./pages/admin/CreateAnimal/CreateAnimal";
import DeleteAnimal from "./pages/admin/deleteAnimal/DeleteAnimal";
import EditAnimal from "./pages/admin/editAnimal/EditAnimal";
import EditAboutUs from "./pages/admin/editAboutUs/EditAboutUs";
import EditVoluntary from "./pages/admin/editVoluntary/EditVoluntary";
import Contact from "./pages/Contact";
import Voluntary from "./pages/Voluntary";
import EditContact from "./pages/admin/editContact/EditContact";


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
            <Route path="/animal/:id" element={<Animal />} />
            <Route path="/adoption-form/:id" element={<AdoptionForm />} />
            <Route path="/administration-page" element={<AdministrationPage />} />
            <Route path="/add-animal" element={<CreateAnimal />} />
            <Route path="/delete-animal" element={<DeleteAnimal />} />
            <Route path="/edit-animal" element={<EditAnimal />} />
            <Route path="/edit-about" element={<EditAboutUs/>} />
            <Route path="/edit-voluntary" element={<EditVoluntary/>} />
            <Route path="/edit-contact" element={<EditContact/>} />
            <Route path="/voluntary" element={<Voluntary/>} />
          </Routes>
        </div>
      </>
  )
}
export default App;

