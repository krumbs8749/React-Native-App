import { useEffect, useState } from "react";
import axios from "axios";

const key = process.env.RAPID_API_KEY;

export default useFetch = (endpoint, query) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
    method: 'POST',
    url: `http://192.168.0.55:8080/api/v1/job/search`,
    data: query,
    headers: {
        'Content-Type': 'application/json'
      }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            await response;
            setData(response.data.jobs);
            console.log(response.data.jobs);
        } catch (error) {
            setError(error);
            console.log(error)
            alert('There was an error fetching data', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(data) return;
        fetchData();
    }, [data]);

    const refetch = () => {
        setLoading(true);
        fetchData();
    }

    return {data, loading, error, refetch};
    
}