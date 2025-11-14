import React, { useEffect, useState } from "react";

function Logger({ numbers }) {
  const [logMessages, setLogMessages] = useState([]);

  useEffect(() => {
    const logs = [];
    numbers.forEach((num) => {
      console.log(num);
      logs.push(num); // store for display
    });
    setLogMessages(logs);
  }, [numbers]);

  return (
    <div>
      <h3>Logger</h3>
      <p>Check the console and below to see logged numbers:</p>
      <ul>
        {logMessages.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default Logger;
