import { useState, useEffect } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const promises = urls.map((url) => 
            fetch(baseUrl + url).then((resp) => {
                if (resp.ok) return resp.json();
                throw resp;
            })        
        );

        Promise.all(promises)
            .then((json) => setData(json))
            .catch((e) => {
                console.error(e);
                setError(e);
            })
            .finally(() => setLoading(false));
// eslint-disable-next-line
    }, []);

    return {data, error, loading};

}