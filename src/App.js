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
      <div className="demo-wrapper">
        <div className="demo-card">
          <h2 className="demo-title">Autosuggest Demo</h2>
          <p className="demo-subtitle">Start typing to search recipes</p>
          <div className="demo-inputs">
            <AutoSuggest
              placeholder="Search recipes..."
              customLoading="Searching..."
              dataKey="name"
              fetchSuggestions={fetchSuggestions}
            />
          </div>
          <div className="demo-features">
            <div>⌨️ Keyboard navigation</div>
            <div>🕒 Debounced fetch (300ms)</div>
            <div>🚫 Abort in-flight requests</div>
            <div>🗂️ Client-side result caching</div>
            <div>♿ ARIA combobox/listbox</div>
            <div>🔄 Loading, error, empty states</div>
            <div>🧭 Auto-scroll to active item</div>
            <div>🎯 Optional auto-focus</div>
          </div>
        </div>
      </div>
    </div>
  );
}
