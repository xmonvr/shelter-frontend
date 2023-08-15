import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {useAuth} from "../auth/auth";

export const useAxiosGet = ({ url, params = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(true);

    const fetchData = useCallback(() => {
        axios
            .get(url, { params: { ...params } }, JSON.parse(headers))
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
            })
            .finally(() => {
                setloading(false);
            });
    }, [params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { response, error, loading, fetchData };
};

export const useAxiosMutate = ({ method, url, body, contentType }) => {
    const {token} = useAuth();
    const mutate = () => {
        axios[method](
            url,
            { body: body },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": contentType,
                },
            }
        )
            .then(() => alert("Operacja wykonana!"))
            .catch((e) => alert(`Wystąpił nieoczekiwany błąd - ${e.message}`));
    };

    return { mutate };
};
