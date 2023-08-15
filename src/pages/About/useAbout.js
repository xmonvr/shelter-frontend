import {BASE_URL, ENDPOINTS} from "../../api/endpoints";
import { useAxiosGet } from "../../hooks/api";

export const useAbout = () => {
    const {
        response: aboutData,    //java script; response ma bardziej specyficzna nazwe
        error,
        loading,
    } = useAxiosGet({ url: BASE_URL + ENDPOINTS.about });

    return { aboutData, error, loading };
};
