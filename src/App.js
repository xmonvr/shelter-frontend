import './App.css';
import Navbar from "./Components/Navbar";
import Adopt from "./pages/Adopt/Adopt";
import Donate from "./pages/Donate/Donate";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage"
import {Route, Routes} from "react-router-dom";
import Registration from './pages/Registration/Registration';
import React, { useState } from 'react';
import Animal from "./pages/Animal/Animal";
import AdoptionForm from "./pages/AdoptionForm/AdoptionForm";
import AdministrationPage from "./pages/admin/AdministrationPage";
import CreateAnimal from "./pages/admin/CreateAnimal/CreateAnimal";
import DeleteAnimal from "./pages/admin/deleteAnimal/DeleteAnimal";
import EditAnimal from "./pages/admin/editAnimal/EditAnimal";
import EditAboutUs from "./pages/admin/editAboutUs/EditAboutUs";
import EditVoluntary from "./pages/admin/editVoluntary/EditVoluntary";
import Contact from "./pages/Contact/Contact";
import Voluntary from "./pages/Voluntary/Voluntary";
import EditContact from "./pages/admin/editContact/EditContact";


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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/donate/:id" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
              {!isLoggedIn && (
                  <Route path="/register" element={<Registration />} />
              )}
            <Route path="/animal/:id" element={<Animal />} />
              {/*{isLoggedIn && (*/}
                  <Route path="/adoption-form/:id" element={<AdoptionForm />} />
              {/*)}*/}
              {isLoggedIn && userRole === 'ADMIN' && (
                  <>
                      <Route path="/administration-page" element={<AdministrationPage />} />
                      <Route path="/add-animal" element={<CreateAnimal />} />
                      <Route path="/delete-animal" element={<DeleteAnimal />} />
                      <Route path="/edit-animal" element={<EditAnimal />} />
                      <Route path="/edit-about" element={<EditAboutUs/>} />
                      <Route path="/edit-voluntary" element={<EditVoluntary/>} />
                      <Route path="/edit-contact" element={<EditContact/>} />
                  </>
              )}
            <Route path="/voluntary" element={<Voluntary/>} />
          </Routes>
        </div>
      </>
  )
}
export default App;

