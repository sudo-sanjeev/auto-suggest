import { useRef, useState, useEffect } from "react";

export const useCustomFetch = (fetchSuggestions, debounceTime = 300) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cache, setCache] = useState({});

  const abortController = useRef(null);

  const fetchResults = async () => {
    setError("");
    if (cache[query]) {
      setData(cache[query]);
      return;
    }

    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();
    setLoading(true);

    try {
      const data = await fetchSuggestions(query, abortController.current);
      setData(data);
      setCache((prev) => ({ ...prev, [query]: data }));
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to fetch results");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults();
    }, debounceTime);
    return () => clearTimeout(timer);
  }, [query]);

  return { data, error, query, loading, setQuery };
};
