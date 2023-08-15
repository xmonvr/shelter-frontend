import {useAxiosGet} from "../../hooks/api";
import {ENDPOINTS} from "../../api/endpoints";

export const useContact = () => {
    const {     //destrukturyzacja, aby wodrebnic wartosci z obiektu
                // mozna wykorzystac tylko niektore elementy obiektu (dlatego nie korzystamy z fetch data)
        response: contactData,
        error,
        //nie podajemy fetchdata
    } = useAxiosGet({url: ENDPOINTS.contact});
    // klamry w useAxiosGet tworzą obiekt literałowy.
    // W ten sposób tworzymy obiekt, który jest przekazywany jako argument do funkcji useAxiosGet.
    // Ten obiekt ma właściwość url, która jest ustawiana na wartość ENDPOINTS.contact

    //zwracamy obiekt z dwoma wlasciwosciami
    //dzięki temu w miejscach, gdzie używamy tej funkcji, mozna latwo uzyskać dostęp
    //do contactData i error, poniewaz są one opakowane w zwróconym obiekcie.
    return {contactData, error};
}