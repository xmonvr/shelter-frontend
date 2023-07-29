import './EditAboutUs.css';

export default function EditAboutUs() {

    const handleEditAboutUs = async (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const url =  `http://localhost:8081/tab/add-about-entry`;
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
        <div className="container-edit-about-us">
            <form className="form-edit-about-us" onSubmit={handleEditAboutUs}>
                <h2 className="header-edit-about-us">Edytuj zakładkę "O nas"</h2>
                <div className="box-edit-about-us">
                    <div className="edit-about-us">
                        <label className="label-edit-about-us" htmlFor="aboutUsEntry">Tekst:</label>
                        <textarea className="input-edit-about-us" type="text" id="aboutUsEntry" name="aboutUsEntry" rows="4" maxLength="5000" required/>
                    </div>
                    <div className="button-edit-about-us">
                        <input className="input-send-edit-about-us" type="submit" id="submit" value="Dodaj" />
                    </div>
                </div>
            </form>
        </div>
    )
}