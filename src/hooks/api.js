import {useState, useEffect, useCallback, useMemo} from "react";
import axios from "axios";
import {useAuth} from "../auth/auth";
import {useLocalStorage} from "./useLocalStorage";

export const useAxiosGet = ({ url, params = {}, headers = {} }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    const memoizedParams = useMemo(() => params, []);   //raz sie wykonuje i zapamietuje, nie bedzie petli
    const memoizedHeaders = useMemo(() => headers, []);

    const fetchData = useCallback(() => {
        axios
            .get(url, { params: { ...memoizedParams } }, {headers: {...memoizedHeaders}})
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setResponse([...res.data]);
                } else if (typeof res.data === "object" && res.data !== null) {
                    setResponse({ ...res.data });
                } else {
                    setResponse(res.data);
                }
            })
            .catch((err) => {
                setError(err);
            });
    }, [url, memoizedParams, memoizedHeaders]);      //jezeli cos z tego sie zmieni, to wykonaj jeszcze raz

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { response, error, fetchData };
};

export const useAxiosMutate = (method) => {
    const {getItem} = useLocalStorage();
    return async ({ url, body, contentType = "application/json" }) => {
        const token = getItem("token");
        console.log("token " + token);

        await axios[method](
            url,
            { ...body },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": contentType,
                },
            }
        )
    };

    // return { mutate };
};
