import { useEffect, useState, useRef } from "react";

export default function AutoSuggest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const abortController = useRef(null);

  useEffect(() => {
    const timer = setTimeout(fetchRecipes, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  async function fetchRecipes() {
    if (cache[searchQuery]) {
      setRecipes(cache[searchQuery]);
      return;
    }

    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();

    const res = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchQuery}`,
      { signal: abortController.signal }
    );
    const json = await res.json();
    setRecipes(json?.recipes);
    setCache((prev) => ({ ...prev, [searchQuery]: json?.recipes }));
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div>
      <input
        className="search-container"
        onChange={(e) => handleInputChange(e)}
        onBlur={(e) => {
          setShowResults(false);
        }}
        onFocus={(e) => {
          setShowResults(true);
        }}
      ></input>
      {showResults && (
        <div className="suggestion-container">
          {recipes.map((r) => (
            <span className="suggestion" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
