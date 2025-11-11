import logo from './logo.svg';
import './App.css';

function App() {
  const user = "Pranav";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h1> Welcome, {user}</h1>
        <p> This is JSX demo in action</p>
      </div>
    </div>
  );
}

export default App;
