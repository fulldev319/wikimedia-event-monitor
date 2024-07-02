import React from "react";
import "./App.css";
import EventStream from "./components/EventStream";

function App() {
  return (
    <div className="App">
      <h1>Wikimedia Event Monitor</h1>
      <EventStream />
    </div>
  );
}

export default App;
