import { useState, useEffect } from "react";
import axios from "axios";

const GetTopMovies = () => {
    const [data, setData] = useState({
        results: [],
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const fetch = async () => {
                try {
                    const res = await axios("http://localhost:4000/ranking?rankingType=movie");
                    setData({ ...data, results: res.data.data });
                } catch (err) {
                    console.error(err);
                }
            };
            fetch();
        }, 1000);
        return () => clearTimeout(timeoutId);
        
    }, []);
    
    return { data, setData };
};

export default GetTopMovies;