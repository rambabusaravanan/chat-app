import React, { useState } from "react";
import "./App.css";
import Register from "./Register";
import ChatApp from "./ChatApp";

function App() {
  let [username, setUsername] = useState('');

  return (
    <div className="Wrapper">
      {username ? (
        <ChatApp username={username} />
      ) : (
        <Register onRegister={setUsername} />
      )}
    </div>
  );
}

export default App;
