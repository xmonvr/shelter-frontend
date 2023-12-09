import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import Adopt from "../pages/Adopt/Adopt";
import Donate from "../pages/Donate/Donate";
import Contact from "../pages/Contact/Contact";
import {About} from "../pages/About/About";
import Registration from "../pages/Registration/Registration";
import Animal from "../pages/Animal/Animal";
import AdoptionForm from "../pages/AdoptionForm/AdoptionForm";
import AdministrationPage from "../pages/admin/AdministrationPage";
import CreateAnimal from "../pages/admin/CreateAnimal/CreateAnimal";
import DeleteAnimal from "../pages/admin/deleteAnimal/DeleteAnimal";
import EditAnimal from "../pages/admin/editAnimal/EditAnimal";
import EditAboutUs from "../pages/admin/editAboutUs/EditAboutUs";
import EditVoluntary from "../pages/admin/editVoluntary/EditVoluntary";
import EditContact from "../pages/admin/editContact/EditContact";
import Voluntary from "../pages/Voluntary/Voluntary";
import {useAuth} from "../auth/useAuth";
import {LoginPage} from "../pages/Login/LoginPage";

export function Router() {
    const {user} = useAuth();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/donate/:id" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage/>} />
            {!user && (
                <Route path="/register" element={<Registration />} />
            )}
            <Route path="/animal/:id" element={<Animal />} />
            <Route path="/adoption-form/:id" element={<AdoptionForm />} />
            {user && user.role === 'ADMIN' && (
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
    )
}