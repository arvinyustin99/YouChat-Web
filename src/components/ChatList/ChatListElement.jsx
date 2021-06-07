import React, { Component } from 'react';

const ChatListElement = (props) => {
  const { clipMessage, lastUpdate } = props && props.param
    ? props.param
    : { displayName: "", clipMessage: "", lastUpdate: "" };
  const { members: displayName } = props && props.param
    ? props.param
    : "";
  const { active } = props && props.active
    ? props
    : false;
  return (
    <div className={`chat_list ${active ? "active_chat" : ""}`}>
      <div className="chat_people">
        <div className="chat_ib">
          <h5>{displayName}<span className={`chat_date`}>{lastUpdate}</span></h5>
          <p>
            {clipMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
export default ChatListElement;