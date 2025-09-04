import { useRef, useState } from "react";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import SearchInput from "./SearchInput";
import SuggestionList from "./SuggestionList";

export default function AutoSuggest() {
  const [showResults, setShowResults] = useState(false);
  const { data, error, query, setQuery } = useRecipeSearch();
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
      <SuggestionList
        suggestions={data}
        isVisible={showResults && !error}
        onSuggestionClick={handleSuggestionSelect}
      />
    </div>
  );
}
