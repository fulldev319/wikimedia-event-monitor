import React from "react";

const FilterControls = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div>
      <label>
        Domain:
        <input type="text" name="domain" onChange={handleFilterChange} />
      </label>
      {/* Add more filters as needed */}
    </div>
  );
};

export default FilterControls;
