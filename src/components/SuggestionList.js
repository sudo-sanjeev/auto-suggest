export default function SuggestionList({
  suggestions,
  isVisible,
  onSuggestionClick,
}) {
  if (!isVisible || !suggestions?.length) {
    return null;
  }

  return (
    <div className="suggestion-container">
      {suggestions.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className="suggestion"
            onClick={() => onSuggestionClick(recipe)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {recipe.name}
          </div>
        );
      })}
    </div>
  );
}
