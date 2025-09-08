import { useRef, useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
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

  const handleClose = () => {
    setShowResults(false);
  };

  const handleSuggestionSelect = (item) => {
    const displayValue = dataKey ? item[dataKey] : item;
    setQuery(displayValue);
    setShowResults(false);
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
  };

  const {
    activeIndex,
    handleKeyDown,
    setActiveIndex,
    resetActiveIndex,
    scrollToActiveItem,
  } = useKeyboardNavigation(
    data,
    handleSuggestionSelect,
    handleClose,
    showResults
  );

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setShowResults(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setShowResults(false);
      resetActiveIndex();
    }, 250);
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
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={showResults}
        aria-autocomplete="list"
      />
      {showResults && (
        <ul className="suggestion-container" role="listbox">
          <SuggestionList
            loading={loading}
            error={error}
            suggestions={data}
            onSuggestionClick={handleSuggestionSelect}
            dataKey={dataKey}
            customLoading={customLoading}
            noResultsMessage={noResultsMessage}
            activeIndex={activeIndex}
            onMouseEnter={setActiveIndex}
            scrollToActiveItem={scrollToActiveItem}
          />
        </ul>
      )}
    </div>
  );
}
