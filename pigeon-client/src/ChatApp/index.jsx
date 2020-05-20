import React, { useEffect, useState, useRef } from "react";
import ChatList from "../ChatList";
import ChatWindow from "../ChatWindow";
import io from "socket.io-client"

export default function ChatApp(props) {

  let [users, setUsers] = useState([]);
  let [messages, setMessages] = useState({});
  let [active, setActive] = useState({});

  const { username } = props;  
  let socketRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.emit('register', { username }, (error) => {
      if (error) { alert(error); }
    });

    socket.on('users', data => {
      console.log('users:', data);
      setUsers(data);
    });

    socket.on('message', data => {
      console.log('message:', data);
      setMessages(msgs => ({ ...msgs, [data.from]: [...(msgs[data.from] || []), data]}))
    });

    socketRef.current = socket;
  }, [username]);

  function handleMessage(message) {
    const socket = socketRef.current;
    if (!socket) return;
    console.log('< message:', message);

    const data = { message, chat: active.id, to: active.username, from: username };
    setMessages(msgs => ({ ...msgs, [data.to]: [...(msgs[data.to] || []), data]}))
    socket.emit('message', data)
  }

  return (
    <div className="App">
      <ChatList data={users} onSelect={setActive} active={active} username={username} />
      {active && active.id ? <ChatWindow data={messages[active.username]} username={username} onMessage={handleMessage} /> : <div className="ChatWindowPlaceholder"><p>Please select a chat</p></div>}
    </div>
  );
}