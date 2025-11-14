import React, { useEffect, useState } from "react";

function ConstructorDemo() {
  const [message, setMessage] = useState("");

  // Using a simple constructor function
  function Person(name) {
    this.name = name;
    this.sayHi = function () {
      return `Hi, my name is ${this.name}`;
    };
  }

  useEffect(() => {
    const person = new Person("Pranav");
    console.log(person.sayHi()); // still logs to console
    setMessage(person.sayHi()); // updates state to display on page
  }, []);

  return (
    <div>
      <h3>Constructor Demo</h3>
      <p>{message || "Open console to see constructor example output."}</p>
    </div>
  );
}

export default ConstructorDemo;
