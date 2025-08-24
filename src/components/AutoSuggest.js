import { useEffect, useState } from "react";

export default function AutoSuggest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cashe, setCashe] = useState({});

  useEffect(() => {
    const timer = setTimeout(fetchRecipes, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  async function fetchRecipes() {
    if (cashe[searchQuery]) {
      setRecipes(cashe[searchQuery]);
      return;
    }
    const res = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchQuery}`
    );
    const json = await res.json();
    setRecipes(json?.recipes);
    setCashe((prev) => ({ ...prev, [searchQuery]: json?.recipes }));
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
