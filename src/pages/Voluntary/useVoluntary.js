import {useAxiosGet} from "../../hooks/api";
import {ENDPOINTS} from "../../api/endpoints";

export const useVoluntary = () => {
    const {
        response: voluntaryData,
        error
    } = useAxiosGet({url: ENDPOINTS.volutary});

    return {voluntaryData, error};
}