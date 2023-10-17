import './AdministrationPage.css';
import {Link} from "react-router-dom";

export default function AdministrationPage() {
    return (
        <div className="administration-page">
            <h3 className="animal-header-administration-page">Zwierze</h3>
            <div className='animal-administration-page'>
                <Link to="/add-animal" className="add-animal-administration-page">
                    <p>Dodaj zwierzę</p>
                </Link>
                <Link to="/delete-animal" className="delete-animal-administration-page">
                    <p>Usuń zwierzę</p>
                </Link>
                <Link to="/edit-animal" className="edit-animal-administration-page">
                    <p>Edytuj zwierzę</p>
                </Link>
            </div>
            <h3 className="edit-website-header-administration-page">Edytuj zawartość zakładek</h3>
            <div className="edit-website-administration-page">
                <Link to="/edit-about" className="edit-about-administration-page">
                    <p>Edytuj zakładkę O nas</p>
                </Link>
                <Link to="/edit-voluntary" className="edit-voluntary-administration-page">
                    <p>Edytuj zakładkę Wolontariat</p>
                </Link>
                <Link to="/edit-contact" className="edit-contact-administration-page">
                    <p>Edytuj zakładkę Kontakt</p>
                </Link>
            </div>
        </div>
    )
}

