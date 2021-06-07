import { db } from './firebase';
export const retrieveChatList = async (uid) => {
  if (!uid) {
    return;
  }

  const userReference = db.collection("message");

  try {
    const chatListData = await userReference
      .where("members", "array-contains", uid)
      .get()
      .then((querySnapshot) => {
        let tempChat = [];
        querySnapshot.forEach((doc) => {
          const docId = doc && doc.id
            ? doc.id
            : -1;
          const recipient = doc.data() && doc.data().members
            ? doc.data().members
            : -1;
          let data = {};
          data.docId = docId;
          data.members = doc.data().members.filter(el => el !== uid);
          
          tempChat.push(data);
        })
        return tempChat;
      })
    return chatListData;
  } catch (err) {
    console.error(err)
    return;
  }
}