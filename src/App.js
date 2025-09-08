import "./styles.css";
import AutoSuggest from "./components/AutoSuggest";

export default function App() {
  const fetchSuggestions = async (query, abortController) => {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`, {
      signal: abortController.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const results = await res.json();
    return results.recipes;
  };

  return (
    <div className="App">
      <AutoSuggest fetchSuggestions={fetchSuggestions}></AutoSuggest>
    </div>
  );
}
