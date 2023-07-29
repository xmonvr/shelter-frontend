import './EditVoluntary.css';

export default function EditVoluntary() {

    const handleEditAboutUs = async (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const url =  `http://localhost:8081/tab/add-volunteering-entry`;
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
        <div className="container-edit-voluntary">
            <form className="form-edit-voluntary" onSubmit={handleEditAboutUs}>
                <h2 className="header-edit-voluntary">Edytuj zakładkę "Wolontariat"</h2>
                <div className="box-edit-voluntary">
                    <div className="edit-voluntary">
                        <label className="label-edit-voluntary" htmlFor="volunteeringEntry">Tekst:</label>
                        <textarea className="input-edit-voluntary" type="text" id="volunteeringEntry" name="volunteeringEntry" rows="4" maxLength="700" required/>
                    </div>
                    <div className="button-edit-voluntary">
                        <input className="input-send-edit-voluntary" type="submit" id="submit" value="Dodaj" />
                    </div>
                </div>
            </form>
        </div>
    )
}