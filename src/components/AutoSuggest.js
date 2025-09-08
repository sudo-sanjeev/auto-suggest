import { useRef, useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import SuggestionList from "./SuggestionList";
import "./styles/styles.css";

export default function AutoSuggest({
  placeholder = "Search...",
  customLoading = "Loading...",
  noResultsMessage = "No result found",
  dataKey = "name",
  fetchSuggestions,
  autoFocus = false,
}) {
  const [showResults, setShowResults] = useState(false);
  const { data, error, query, loading, setQuery } =
    useCustomFetch(fetchSuggestions);

  const handleClose = () => {
    setShowResults(false);
  };

  const handleSuggestionSelect = (item) => {
    const displayValue = dataKey ? item[dataKey] : item;
    setQuery(displayValue);
    handleClose();
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

  return (
    <div>
      <input
        className="search-container"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        autoFocus={autoFocus}
        onFocus={() => setShowResults(true)}
        onBlur={() => {
          setShowResults(false);
          resetActiveIndex();
        }}
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
