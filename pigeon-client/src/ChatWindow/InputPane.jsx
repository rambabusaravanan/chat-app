import React, { useState } from "react";

export default function InputPane(props) {
  let [message, setMessage] = useState('');
  
  function sendMessage() {
    if (!message) return;

    setMessage('');
    props.onMessage(message);
  }

  return (
    <div className="InputPane">
      <input
        type="text"
        name="message"
        placeholder="Type a message .."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}