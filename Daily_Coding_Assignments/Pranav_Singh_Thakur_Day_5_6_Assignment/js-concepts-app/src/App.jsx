import React, { useState } from "react";
import NumberList from "./components/NumberList";
import FilterControls from "./components/FilterControls";
import Logger from "./components/Logger";
import HoistingDemo from "./components/HoistingDemo";
import ConstructorDemo from "./components/ConstructorDemo";
import "./App.css";

function App() {
  const initialNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [numbers, setNumbers] = useState(initialNumbers);

  // Filter even numbers
  const handleFilterEven = () => {
    setNumbers(prev => prev.filter(num => num % 2 === 0));
  };

  // Double all numbers
  const handleMapDouble = () => {
    setNumbers(prev => prev.map(num => num * 2));
  };

  // Reset to original list
  const handleReset = () => {
    setNumbers(initialNumbers);
  };

  return (
    <div className="app-container">
      <h1>JavaScript Concepts Sprint</h1>

      <FilterControls
        onFilterEven={handleFilterEven}
        onMapDouble={handleMapDouble}
        onReset={handleReset}
      />

      <NumberList numbers={numbers} />
      <Logger numbers={numbers} />
      <HoistingDemo />
      <ConstructorDemo />
    </div>
  );
}

export default App;
