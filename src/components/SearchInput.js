export default function SearchInput({ value, onSearch, onFocus, onBlur }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className="search-container"
      placeholder="Search recipes..."
      value={value}
      onChange={handleInputChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
