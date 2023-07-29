import './EditContact.css';

export default function EditContact() {

    const handleEditContact = async (event) => {
        const token = localStorage.getItem("token");
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const url =  `http://localhost:8081/tab/add-contact-entry`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data)
            });
            console.log("data --> " + data)
            console.log("url --> " + url)


            if (response.ok) {

            } else {
                console.error("Błąd:", response.statusText);
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    }

    return (
        <div className="container-edit-contact">
            <form className="form-edit-contact" onSubmit={handleEditContact}>
                <h2 className="header-edit-contact">Edytuj zakładkę "Kontakt"</h2>
                <div className="box-edit-contact">
                    <div className="edit-contact">
                        <label className="label-edit-contact" htmlFor="contactEntry">Tekst:</label>
                        <textarea className="input-edit-contact" type="text" id="contactEntry" name="contactEntry" rows="4" maxLength="5000" required/>
                    </div>
                    <div className="button-edit-contact">
                        <input className="input-send-edit-contact" type="submit" id="submit" value="Dodaj" />
                    </div>
                </div>
            </form>
        </div>
    )
}