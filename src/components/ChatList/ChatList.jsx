import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { signout } from '../../helpers/auth';
import ChatListElement from "./ChatListElement";

const propTemplate = {
  docId: String,
  displayName: String,
  clipMessage: String,
  lastUpdate: TimeRanges
};

const Chat = (props) => {
  const [chatList, setChatList] = useState([]);
  const [active, setActive] = useState("");

  const signOut = async (event) => {
    event.preventDefault();
    try {
      await signout();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setChatList(props.chats);
  }, [props.chats]);

  let transactionActive = [];
  for (let i = 1; i <= chatList.length; i++){
    transactionActive.push(false);
  }

  const onClickTransaction = (index) => {
    setActive(chatList[index].docId);
  }

  const renderChatListElement = chatList.map((el, index) => {
    return (
      <div className={`chat_list ${active === el.docId ? "active_chat" : ""}`} key={`${el.docId}`} onClick={() => {onClickTransaction(index)}}>
        <div className="chat_people">
          <div className="chat_ib">
            <h5>{el.members[0]}<span className={`chat_date`}>{"0"}</span></h5>
            <p>
              {active === el.docId ? "ACTIVE" : "" }
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="inbox_people">
        <div className="headind_srch">
          <div className="recent_heading">
            <h4>Recent</h4>
          </div>
          <Button className="signout_btn" variant="btn btn-info" onClick={signOut}>Sign Out</Button>
        </div>

        <div className="inbox_chat">
          {chatList.length > 0 ? renderChatListElement : ""}
        </div>
      </div>
    </>
  );
}
export default Chat;