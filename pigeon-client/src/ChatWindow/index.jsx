import React from 'react';
import InputPane from './InputPane';

function MessageItem(props) {
  return <div className={"MessageItem " + (props.self ? "self" : "")}>
    <div className="message">{props.message}</div>
  </div>
}

export default function ChatWindow(props) {
  const data = props.data || [];

  return (
    <div className="ChatWindow" style={props.style}>
      <div className="MessagePane">
        {data.map((d, i) => <MessageItem key={i} {...d} self={d.from === props.username} />)}
      </div>
      <InputPane onMessage={props.onMessage} />
    </div>
  );
}

