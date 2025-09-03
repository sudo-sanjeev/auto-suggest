import { useState } from "react";
import { useCustomFetch } from "../Hooks/useCustomFetch";

export default function AutoSuggest() {
  const [showResults, setShowResults] = useState(false);
  const {data, error, setQuery}= useCustomFetch("https://dummyjson.com/recipes/search");

  function handleInputChange(e) {
    setQuery(e.target.value);
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
      {showResults && data && error && (
        <div className="suggestion-container">
          {data.map((r) => (
            <span className="suggestion" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
