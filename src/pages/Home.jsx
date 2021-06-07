import React, { Component, useContext, useState, useEffect } from 'react';
import { UserContext } from '../providers/UserProviders';
import Chat from '../components/ChatList/ChatList';
import DetailMessage from '../components/DetailMessage/DetailMessage';
import { retrieveChatList } from '../services/message.js';
import { getPublicDataFriends } from '../services/friends';

const Home = () => {
  const chatListMockUp = [
    {
      docId: "ODMOGIFnMeW7ayZ8arNc",
      displayName: "Meisya",
      clipMessage: "Ohh, jajaja,",
      lastUpdate: "June 4, 2021 at 11:41:07 AM UTC+7"
    },
    {
      docId: "ODMOGIFnMeW7ayZ8fGNc",
      displayName: "Sally",
      clipMessage: "2k, terpisah sm 3k kemarin",
      lastUpdate: "June 4, 2021 at 11:38:07 AM UTC+7"
    },
    {
      docId: "ODMOGIFnMeW7ay9ParNc",
      displayName: "Steven",
      clipMessage: "Nnt aku cek kalo ingat ya",
      lastUpdate: "June 1, 2021 at 07:00:45 PM UTC+7"
    }
  ]
  const messageMockUp = [
    {
      messageText: "Hai, o hisashiburi. genki desuka?",
      sentAt: "June 4, 2021 at 11:36:06 AM UTC+7",
      sentBy: 0
    },
    {
      messageText: "genki desu. Dou shita ne?",
      sentAt: "June 4, 2021 at 11:38:32 AM UTC+7",
      sentBy: 1
    },
    {
      messageText: "Ohh, nani mo okoronakatta. ;B",
      sentAt: "June 4, 2021 at 11:39:21 AM UTC+7",
      sentBy: 0
    },
    {
      messageText: "Ohh, jajaja,",
      sentAt: "June 4, 2021 at 11:41:23 AM UTC+7",
      sentBy: 1
    }
  ];
  const user = useContext(UserContext);
  const [friendBio, setFriendBio] = useState([]);
  const [chatList, setChatList] = useState([]);
  const { uid } = user;
  const { friends } = user;


  useEffect(() => {
    const getFriend = async (friend) => {
      try {
        await getPublicDataFriends(friend)
          .then((res) => {
            if (res !== friend) {
              setFriendBio(res);
            }
          })
      } catch (err) {
        console.error(err);
      }
    }
    getFriend(friends);

    const updateClickedChat = (event, docId) => {
      event.preventDefault();
    };

    const getChatList = async (id) => {
      try {
        await retrieveChatList(id)
          .then((res) => {
            if (res !== chatList) {
              setChatList(res);
            }
          })
      } catch (err) { console.error(err); }
    }
    getChatList(uid);
  }, []);

  useEffect(() => {
    if (friendBio && friendBio.length > 0 && chatList && chatList.length > 0) {
      let tempList = chatList;
      console.log(tempList);
      for (let i = 0; i < tempList.length; i++){
        tempList[i].members[0] = friendBio.find(elmt => elmt.uid === tempList[i].members[0]);
        tempList[i].members[0] = tempList[i].members[0].displayName;
      }
      setChatList(tempList);
    }

  }, [chatList, friendBio]);

  return (
    <>
      <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/css/style.css`} type="text/css" />
      <div className="container">
        <p>{friendBio && friendBio[1] && friendBio[1].displayName ? friendBio[1].displayName : ""}</p>
        <p>{friendBio && friendBio[1] && friendBio[1].uid ? friendBio[1].uid : ""}</p>

        <div className="messaging">
          <div className="inbox_msg">
            <Chat chats={chatList} /*onClick={this.updateClickedChat.bind(this)}*//>
            <div className="recipient_detail">
              <div className="recipient_img">
              </div>
              <div className="recipient_name">
                <h5>Meisya</h5>
              </div>
            </div>
            <div className="detail_msg">
              <div className="msg_history">
                <DetailMessage messages={messageMockUp} />
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input type="text" className="write_msg" placeholder="Type a message" />
                  <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o"
                    aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;