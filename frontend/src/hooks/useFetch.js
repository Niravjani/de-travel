import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from:", url); // Debugging log
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(`HTTP error! status: ${response.status}`);
          console.error("Error fetching data:", response.statusText); // Debugging log
          return;
        }
        const result = await response.json();
        setData(result.data); // Assuming the API response has a [data](http://_vscodecontentref_/1) field
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err); // Debugging log
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;