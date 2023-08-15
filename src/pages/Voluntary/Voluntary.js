import "./Voluntary.css"
import {useVoluntary} from "./useVoluntary";

export default function Voluntary() {

    const {voluntaryData, error} = useVoluntary();
    if (error) {
        return <p>Błąd podczas komunikacji z serwerem: {error}</p>;
    }

    return (
        <div className="container-voluntary">
            <div className="box-voluntary">
                <h2 className="header-voluntary">Wolontariat</h2>
                <div className="info-voluntary">
                    <p>{voluntaryData && voluntaryData.volunteeringEntry}</p>
                </div>
            </div>
        </div>
    )
}