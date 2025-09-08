import { useState, useEffect } from "react";

export const useKeyboardNavigation = (
  data,
  onSelect,
  onClose,
  isVisible = true
) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [data]);

  // Ref callback for scrolling active item into view
  const scrollToActiveItem = (element) => {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (!isVisible || !data || data.length === 0) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex < data.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : data.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < data.length) {
          onSelect(data[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        setActiveIndex(-1);
        break;
      default:
        setActiveIndex(-1);
        break;
    }
  };

  const resetActiveIndex = () => {
    setActiveIndex(-1);
  };

  return {
    activeIndex,
    handleKeyDown,
    setActiveIndex,
    resetActiveIndex,
    scrollToActiveItem,
  };
};
