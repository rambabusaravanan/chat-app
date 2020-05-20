import React from 'react';

function ChatListItem(props) {
  const { username, onClick } = props;

  return <div className={"ChatListItem " + (props.active ? "active" : "")} onClick={onClick}>
    <img src={"https://picsum.photos/seed/" + username + "/24/24"} alt="User"/>
    <div>{username}</div>
  </div>
}

export default function ChatList(props) {
  const data = props.data || [];
  return (
    <div className="ChatList" style={props.style}>
      <div className="header">
        <img src={"https://picsum.photos/seed/" + props.username + "/36/36"} alt="User"/>
        <span>{props.username}</span>
      </div>
      {data.map(d => (
        d.username !== props.username &&
        <ChatListItem
          key={d.id}
          active={props.active.id === d.id}
          {...d}
          onClick={() => props.onSelect(d)}
        />
      ))}
      {!data.length && (
        <div className="ChatListPlaceholder">
          <p>Online users will be listed here. Currently no user is online.</p>
        </div>
      )}
    </div>
  );
}
