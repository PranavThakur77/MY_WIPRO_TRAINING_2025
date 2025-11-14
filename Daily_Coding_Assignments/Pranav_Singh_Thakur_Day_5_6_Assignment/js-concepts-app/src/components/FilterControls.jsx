import React from "react";

function FilterControls({ onFilterEven, onMapDouble, onReset }) {
  return (
    <div>
      <button onClick={onFilterEven}>Show Even Numbers</button>
      <button onClick={onMapDouble}>Double Numbers</button>
      <button onClick={onReset}>Reset Numbers</button>
    </div>
  );
}

export default FilterControls;
