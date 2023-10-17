// import {useState, useEffect, useCallback, useMemo} from "react";
// import axios from "axios";
// import {useLocalStorage} from "./useLocalStorage";

// export const useAxiosGet = ({url, params = {}, headers = {}}) => {
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState("");
//
//     const memoizedParams = useMemo(() => params, []);   //raz sie wykonuje i zapamietuje, nie bedzie petli
//     const memoizedHeaders = useMemo(() => headers, []);
//
//     const fetchData = useCallback(() => {
//         axios
//             .get(url, {params: {...memoizedParams}}, {headers: {...memoizedHeaders}})   //todo po co tworzymy te kopie "..."
//             .then((res) => {
//                 if (Array.isArray(res.data)) {
//                     setResponse([...res.data]);
//                 } else if (typeof res.data === "object" && res.data !== null) {
//                     setResponse({...res.data});
//                 } else {
//                     setResponse(res.data);
//                 }
//             })
//             .catch((err) => {
//                 setError(err);
//             });
//     }, [url, memoizedParams, memoizedHeaders]);      //jezeli cos z tego sie zmieni, to wykonaj jeszcze raz
//
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);
//
//     return {response, error, fetchData};
// };

// export const useAxiosMutate = (method) => {
//     const {getItem} = useLocalStorage();
//     return async ({url, body, contentType = "application/json"}) => {
//         const token = getItem("token");
//         console.log("token " + token);
//
//         await axios[method](
//             url,
//             {...body},    //operator rozwinięcia, który służy do tworzenia kopii elementów z jednego obiektu (lub tablicy) i umieszczania ich w innym obiekcie (lub tablicy)
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": contentType,
//                 },
//             }
//         )
//     };
//
//     // return {mutate};
// };

// export const useAxiosMutate = ({method, url, body, contentType}) => {
//     // const {user: token} = useUser();
//     // const {token} = useAuth();
//     const {getItem} = useLocalStorage();
//
//     const mutate = async () => {
//         const token = getItem("token");
// //         console.log("token " + token);
//         await axios.post(
//             url,
//             {body: body},
//             {
//                 headers: {
//                     Authorization: token,
//                     "Content-Type": contentType,
//                 },
//             }
//         )
//             .then(() => alert("Operacja wykonana!"))
//             .catch((e) => alert(`Wystąpił nieoczekiwany błąd - ${e.message}`));
//     };
//
//     return {mutate};
// };