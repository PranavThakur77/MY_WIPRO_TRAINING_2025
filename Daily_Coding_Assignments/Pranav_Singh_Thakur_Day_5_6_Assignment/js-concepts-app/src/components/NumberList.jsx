import React from "react";

function NumberList({ numbers }) {
  return (
    <div>
      <h3>Number List:</h3>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberList;
