// Here we will add sample code for welcome component
//Step1: Importing react from 'react';
//Step2: Creating a function that returns JSX
//Step3: Importing this component in App.js and using it there
//Step4: Running and building
import React from 'react';
function Welcome(props) {
  return ( 
    <div>
      <h1> Hello, {props.name}!</h1>
      <p> Welcome to our first react component</p>    
    </div>
  );
} //closign of function

export default Welcome; // exporting function
