import { useState } from "react";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import SearchInput from "./SearchInput";
import SuggestionList from "./SuggestionList";

export default function AutoSuggest() {
  const [showResults, setShowResults] = useState(false);
  const { data, error, setQuery } = useRecipeSearch();

  return (
    <div>
      <SearchInput
        onSearch={setQuery}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      <SuggestionList suggestions={data} isVisible={showResults && !error} />
    </div>
  );
}
