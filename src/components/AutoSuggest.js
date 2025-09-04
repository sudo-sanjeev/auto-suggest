import { useRef, useState } from "react";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import SearchInput from "./SearchInput";
import SuggestionList from "./SuggestionList";

export default function AutoSuggest() {
  const [showResults, setShowResults] = useState(false);
  const { data, error, query, loading, setQuery } = useRecipeSearch();
  const blurTimeoutRef = useRef(null);

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setShowResults(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setShowResults(false);
    }, 250);
  };

  const handleSuggestionSelect = (recipe) => {
    setQuery(recipe.name);
    setShowResults(false);
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
  };

  return (
    <div>
      <SearchInput
        value={query}
        onSearch={setQuery}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {loading && showResults && <div className="loading">Searching...</div>}

      {error && showResults && (
        <div className="error-message">Error: {error}</div>
      )}

      {!loading &&
        !error &&
        showResults &&
        data?.length === 0 &&
        query.length > 0 && (
          <div className="no-results">No recipes found for "{query}"</div>
        )}

      <SuggestionList
        suggestions={data}
        isVisible={showResults && !error && !loading && data?.length > 0}
        onSuggestionClick={handleSuggestionSelect}
      />
    </div>
  );
}
