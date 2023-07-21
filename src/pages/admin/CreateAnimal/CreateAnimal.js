import './CreateAnimal.css';

export default function CreateAnimal() {
    const handleSubmit = async (event) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`http://localhost:8081/animal/add-animal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {

            } else {
                console.error("Błąd:", response.statusText);
            }
        } catch (error) {
            console.error("Błąd:", error);
        }
    }

    return (
        <div className="container-create-animal">
            <form className="form-create-animal" onSubmit={handleSubmit}>
                <h2 className="animal-info-header-create-animal">Dane zwierzaka</h2>
                <div className="animal-box-create-animal">
                    <div className="animal-info-create-animal">

                        <div className="name-create-animal">
                            <label className="label-name-create-animal" htmlFor="name">Imię:</label>
                            <input className="input-name-create-animal" type="text" id="name" name="name" required/>
                        </div>

                        <div className="type-of-animal-create-animal">
                            <label className="label-type-of-animal-create-animal" htmlFor="typeOfAnimal">Typ:</label>
                            <select className="select-type-of-animal-create-animal" type="text" id="typeOfAnimal" name="typeOfAnimal" required>
                                <option value="">---</option>
                                <option value="DOG">PIES</option>
                                <option value="CAT">KOT</option>
                                <option value="OTHER">INNE</option>
                            </select>
                        </div>

                        <div className="gender-create-animal">
                            <label className="label-gender-create-animal" htmlFor="gender">Płeć:</label>
                            <select className="select-gender-create-animal" type="text" id="gender" name="gender" required>
                                <option value="">---</option>
                                <option value="ON">ON</option>
                                <option value="ONA">ONA</option>
                            </select>
                        </div>

                        <div className="chip-number-create-animal">
                            <label className="label-chip-number-create-animal" htmlFor="chip_number">Numer chip:</label>
                            <input className="input-chip-number-create-animal" type="number" id="chip_number" name="chip_number" required/>
                        </div>

                        <div className="vaccinated-create-animal">
                            <label className="label-vaccinated-create-animal" htmlFor="isVaccinated">Szczepienie:</label>
                            <select className="select-vaccinated-create-animal" type="text" id="isVaccinated" name="isVaccinated" required>
                                <option value="">---</option>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </select>
                        </div>

                        <div className="age-create-animal">
                            <label className="label-age-create-animal" htmlFor="age">Wiek:</label>
                            <input className="input-age-create-animal" type="number" id="age" name="age" required/>
                        </div>
                    </div>

                    <div className="button-create-animal">
                        <input className="input-send-create-animal" type="submit" id="submit" value="Dodaj" on/>
                        <div className="button-send-create-animal"></div>
                    </div>
                </div>
            </form>
        </div>
    )
}