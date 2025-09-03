export default function SearchInput({ onSearch, onFocus, onBlur }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className="search-container"
      placeholder="Search recipes..."
      onChange={handleInputChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
