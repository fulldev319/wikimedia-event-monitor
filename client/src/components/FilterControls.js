import React from "react";
import "./FilterControls.css";

const FilterControls = ({ onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange(
      name,
      type === "checkbox"
        ? checked
        : value.trim() === ""
        ? undefined
        : value.trim()
    );
  };

  return (
    <div className="filter-controls">
      <label>
        Domain:
        <input type="text" name="domain" onChange={handleInputChange} />
      </label>
      <label>
        Namespace:
        <input type="number" name="namespace" onChange={handleInputChange} />
      </label>
      <label>
        Minor:
        <input type="checkbox" name="minor" onChange={handleInputChange} />
      </label>
      <label>
        Bot:
        <input type="checkbox" name="bot" onChange={handleInputChange} />
      </label>
      <label>
        Title (regex):
        <input type="text" name="titleRegex" onChange={handleInputChange} />
      </label>
      <label>
        Anonymous:
        <input type="checkbox" name="anonymous" onChange={handleInputChange} />
      </label>
    </div>
  );
};

export default FilterControls;
