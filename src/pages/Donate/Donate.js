import "./Donate.css";
import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {ENDPOINTS} from "../../api/endpoints";
import axios from "axios";

export default function Donate() {

    let {id} = useParams();
    const [paymentDescription, setPaymentDescription] = useState("");   //todo use state

    const handlePayment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        let paymentData;
        if (id !== 0) {
            setPaymentDescription(`Darowizna na zwierze ID ${id}`);
            paymentData = {
                description: formData.get("description"),
                buyerEmail: formData.get("buyerEmail"),
                buyerFirstName: formData.get("buyerFirstName"),
                buyerLastName: formData.get("buyerLastName"),
                productName: "darowizna-schronisko",         // todo "schronisko" lub id animala
                productUnitPrice: formData.get("productUnitPrice")
            }
        } else {
            setPaymentDescription("Darowizna na schronisko");
            id = 0;
            paymentData =
                {
                    description: formData.get("description"),
                    buyerEmail: formData.get("buyerEmail"),
                    buyerFirstName: formData.get("buyerFirstName"),
                    buyerLastName: formData.get("buyerLastName"),
                    productName: "darowizna-schronisko",
                    productUnitPrice: formData.get("productUnitPrice")
                };
        }

        try {
            const response2 = await axios.post(ENDPOINTS.createOrder, paymentData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    const redirectUri = res.data.redirectUri;
                    window.location.href = redirectUri;
                })
                .catch(error => {
                    console.error('Błąd:', error);
                });
            if (!response2.data) {
                return console.error(
                    "Błąd podczas pobierania pobierania listy zwierzat: ",
                    response2.statusText
                );
            }
        } catch (error) {
            console.error("Błąd podczas komunikacji z serwerem:", error);
        }
    }

    return (
        <div className="container-donate">
            <form className="form-donate" onSubmit={handlePayment}>
                <div className="info-donate">
                    <p>W tym miejscu możesz wesprzeć nasze schronisko dowolną kwotą.</p>
                    <p>Możesz również przekazać darowiznę na wybrane zwierzę wyszukując je w zakładce "Zaadoptuj".</p>
                </div>
                <div className="description-donate">
                    <label className="label-description-donate" htmlFor="description">Opis:</label>
                    <input className="input-description-donate" type="text" id="description" name="description" value={
                        id !== "0" ? `Darowizna na zwierze ID ${id}` : "Darowizna na schronisko"
                    } readOnly/>
                </div>
                <div className="product-unit-price-donate">
                    <label className="label-product-unit-price-donate" htmlFor="productUnitPrice">Kwota w PLN:</label>
                    <input className="input-product-unit-price-donate" type="number" id="productUnitPrice" name="productUnitPrice" required/>
                </div>
                <div className="buyer-firstname-donate">
                    <label className="label-buyer-firstname-donate" htmlFor="buyerFirstName">Imię:</label>
                    <input className="input-buyer-firstname-donate" type="text" id="buyerFirstName" name="buyerFirstName" required/>
                </div>
                <div className="buyer-lastname-donate">
                    <label className="label-buyer-lastname-donate" htmlFor="buyerLastName">Nazwisko:</label>
                    <input className="input-buyer-lastname-donate" type="text" id="buyerLastName" name="buyerLastName"
                           required/>
                </div>
                <div className="buyer-email-donate">
                    <label className="label-buyer-email-donate" htmlFor="buyerEmail">Adres email:</label>
                    <input className="input-buyer-email-donate" type="email" id="buyerEmail" name="buyerEmail" required/>
                </div>
                {/*<input type="hidden" name="continueUrl" value="http://shop.url/continue"/>*/}
                {/*<input type="hidden" name="OpenPayu-Signature" type="hidden"*/}
                {/*       value="sender=145227;algorithm=SHA-256;signature=565f9f4dda43c8e24ccab4472133d680e2aa58e1f58bea845c4cf2926965144d"/>*/}
                <button className="button-donate" type="submit" formTarget="_blank">Wesprzyj</button>
            </form>
        </div>
    )
}