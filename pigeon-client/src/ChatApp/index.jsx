import React, { useEffect, useState, useRef } from "react";
import ChatList from "../ChatList";
import ChatWindow from "../ChatWindow";
import io from "socket.io-client"

const _ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:5000';

export default function ChatApp(props) {

  let [users, setUsers] = useState([]);
  let [messages, setMessages] = useState({});
  let [active, setActive] = useState({});

  const { username } = props;  
  let socketRef = useRef(null);

  useEffect(() => {
    const socket = io(_ENDPOINT);

    socket.emit('register', { username }, (error) => {
      if (error) { alert(error); }
    });

    socket.on('users', data => {
      console.log('users:', data);
      let users = data.filter(u => u.username !== username)
      setUsers(users);
    });

    socket.on('message', data => {
      console.log('message:', data);
      setMessages(msgs => ({ ...msgs, [data.from]: [...(msgs[data.from] || []), data]}))
    });

    socketRef.current = socket;
  }, [username]);

  useEffect(() => {
    if (active.username) {
      let user = users.find(u => u.username === active.username);
      if (!user) {
        users.length ? setActive(users[0]) : setActive({});
        // if (users.length == 2)
        //   users[0].username !== username ? setActive(users[0]) : setActive(users[1]);
        // else
        //   setActive({});
      }
    }
  }, [users, active])

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