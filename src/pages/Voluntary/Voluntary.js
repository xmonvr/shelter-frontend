import "./Voluntary.css"
import {useState} from "react";
import axios from "axios";
import {ENDPOINTS} from "../../api/endpoints";

export default function Voluntary() {

    const [voluntary, setVoluntary] = useState();
    const getVoluntary = async () => {
        const response = await axios.get(ENDPOINTS.volutary);
        if(!response.data) {
            return <p>Błąd podczas komunikacji z serwerem.</p>
        }
        setVoluntary(response.data);
    }

    useState(() => {
        getVoluntary();
    }, []);

    return (
        <div className="container-voluntary">
            <div className="box-voluntary">
                <h2 className="header-voluntary">Wolontariat</h2>
                <div className="info-voluntary">
                    <p>{voluntary && voluntary.volunteeringEntry}</p>
                </div>
            </div>
        </div>
    )
}