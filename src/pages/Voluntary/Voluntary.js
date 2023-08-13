import {useEffect, useState} from "react";
import "./Voluntary.css"

export default function Voluntary() {

    const [voluntaryInfo, setVoluntaryInfo] = useState("");

    const getVoluntary = async () => {
        const token = localStorage.getItem("token")

        try {
            const url = `http://localhost:8081/tab/get-volunteering-entry`;
            const response = await fetch(url);
            if (response.ok) {
                const info = await response.json();
                setVoluntaryInfo(info);
                console.log("info --> " + info)
            } else {
                console.error("Błąd: ", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem: ", error);
        }
    }

    useEffect(() => {
        getVoluntary();
    }, []);

    return (
        <div className="container-voluntary">
            <div className="box-voluntary">
                <h2 className="header-voluntary">Wolontariat</h2>
                <div className="info-voluntary">
                    <p>{voluntaryInfo.volunteeringEntry}</p>
                </div>
            </div>
        </div>
    )
}