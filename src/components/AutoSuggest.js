import { useRef, useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import SuggestionList from "./SuggestionList";
import "./styles.css";

export default function AutoSuggest({
  placeholder = "Search...",
  customLoading = "Loading...",
  noResultsMessage = "No result found",
  dataKey = "name",
  fetchSuggestions,
}) {
  const [showResults, setShowResults] = useState(false);
  const { data, error, query, loading, setQuery } =
    useCustomFetch(fetchSuggestions);
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

  const handleSuggestionSelect = (item) => {
    const displayValue = dataKey ? item[dataKey] : item;
    setQuery(displayValue);
    setShowResults(false);
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
  };

  return (
    <div>
      <input
        className="search-container"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showResults && (
        <SuggestionList
          loading={loading}
          error={error}
          suggestions={data}
          onSuggestionClick={handleSuggestionSelect}
          dataKey={dataKey}
          customLoading={customLoading}
          noResultsMessage={noResultsMessage}
        />
      )}
    </div>
  );
}
