import React from 'react';

function ChatListItem(props) {
  const { username, onClick } = props;

  return <div className={"ChatListItem " + (props.active ? "active" : "")} onClick={onClick}>
    <div>{username}</div>
  </div>
}

export default function ChatList(props) {
  const data = props.data || [];
  return (
    <div className="ChatList" style={props.style}>
      {data.map(d => (
        d.username !== props.username &&
        <ChatListItem
          key={d.id}
          active={props.active.id === d.id}
          {...d}
          onClick={() => props.onSelect(d)}
        />
      ))}
    </div>
  );
}
