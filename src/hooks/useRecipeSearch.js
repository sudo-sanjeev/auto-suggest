import { useRef, useState, useEffect } from "react";

export const useRecipeSearch = (debounceTime = 300) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [cache, setCache] = useState({});

  const abortController = useRef(null);

  const fetchResults = async () => {
    if (!query.trim()) {
      return;
    }

    if (cache[query]) {
      setData(cache[query]);
      return;
    }

    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();

    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`,
        {
          signal: abortController.current.signal,
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setData(data?.recipes);
      setCache((prev) => ({ ...prev, [query]: data?.recipes }));
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to fetch results");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults();
    }, debounceTime);
    return () => clearTimeout(timer);
  }, [query]);

  return { data, error, query, setQuery };
};
