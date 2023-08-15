import {ENDPOINTS} from "../../api/endpoints";
import { useAxiosGet } from "../../hooks/api";

export const useAnimalList = (searchParams) => {
    const {
        response: animalsListData,
        error,
        fetchData: refetchAnimalList,
    } = useAxiosGet({
        url: ENDPOINTS.filteredAnimals,
        params: { ...searchParams },
    });

    return { animalsListData, error, refetchAnimalList };
};