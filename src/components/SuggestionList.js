export default function SuggestionList({
  suggestions,
  loading,
  error,
  onSuggestionClick,
  dataKey = "",
  customLoading = "Loading...",
  noResultsMessage = "No results found",
  activeIndex = -1,
  onMouseEnter = () => {},
  scrollToActiveItem = () => {},
}) {
  if (loading) {
    return <li className="loading">{customLoading}</li>;
  }

  if (error) {
    return <li className="error-message">Oops! Something went wrong.</li>;
  }

  if (!suggestions || suggestions.length === 0) {
    return <li className="no-results">{noResultsMessage}</li>;
  }

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const displayValue = dataKey ? suggestion[dataKey] : suggestion;
        const isActive = index === activeIndex;

        return (
          <li
            key={suggestion.id}
            ref={isActive ? scrollToActiveItem : null}
            className={`suggestion ${isActive ? "suggestion-active" : ""}`}
            onClick={() => onSuggestionClick(suggestion)}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => onMouseEnter(index)}
            role="option"
            aria-selected={isActive}
          >
            {displayValue}
          </li>
        );
      })}
    </>
  );
}
