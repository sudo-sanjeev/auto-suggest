export default function SuggestionList({
  suggestions,
  loading,
  error,
  onSuggestionClick,
  dataKey = "",
  customLoading = "Loading...",
  noResultsMessage = "No results found",
}) {
  if (loading) {
    return (
      <ul className="suggestion-container">
        <li className="loading">{customLoading}</li>
      </ul>
    );
  }

  if (error) {
    return (
      <ul className="suggestion-container">
        <li className="error-message">Oops! Something went wrong.</li>
      </ul>
    );
  }

  const validSuggestions =
    suggestions?.filter((suggestion) => {
      if (!suggestion) return false;
      if (dataKey) {
        return suggestion[dataKey] && suggestion[dataKey].toString().trim();
      }
      return suggestion.toString().trim();
    }) || [];

  if (validSuggestions.length === 0) {
    return (
      <ul className="suggestion-container">
        <li className="no-results">{noResultsMessage}</li>
      </ul>
    );
  }

  return (
    <ul className="suggestion-container">
      {validSuggestions.map((suggestion) => {
        const displayValue = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={suggestion.id}
            className="suggestion"
            onClick={() => onSuggestionClick(suggestion)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {displayValue}
          </li>
        );
      })}
    </ul>
  );
}
