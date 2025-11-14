import React, { useEffect, useState } from "react";

function HoistingDemo() {
  const [output, setOutput] = useState([]);

  useEffect(() => {
    const logs = [];

    // Variable hoisting example
    console.log("Variable hoisting example:");
    logs.push("Variable hoisting example:");
    console.log(hoistedVar); // undefined due to hoisting
    logs.push("hoistedVar: " + hoistedVar);

    var hoistedVar = "I am hoisted!";

    // Function hoisting example
    console.log("Function hoisting example:");
    logs.push("Function hoisting example:");
    console.log(hoistedFunction()); // works because function is hoisted
    logs.push(hoistedFunction());

    function hoistedFunction() {
      return "I am a hoisted function!";
    }

    setOutput(logs);
  }, []);

  return (
    <div>
      <h3>Hoisting Demo</h3>
      <p>Output of hoisting examples:</p>
      <ul>
        {output.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default HoistingDemo;
