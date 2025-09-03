export default function SuggestionList({ suggestions, isVisible }) {
  if (!isVisible || !suggestions?.length) {
    return null;
  }

  return (
    <div className="suggestion-container">
      {suggestions.map((recipe) => {
        return <div className="suggestion">{recipe.name}</div>;
      })}
    </div>
  );
}
