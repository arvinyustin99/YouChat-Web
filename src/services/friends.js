import { db } from './firebase';
import firebase from 'firebase/app';

export const getPublicDataFriends = async (arrayUID) => {

  const userReference = db.collection('users');
  try {
    const friendsData = await userReference.where("uid", "in", arrayUID)
      .get()
      .then((querySnapshot) => {
        let friendList = [];
        let i = 0;
        querySnapshot.forEach((doc) => {
          const tempData = doc.data()
          ? {uid: doc.id, ...doc.data().public_data}
          : null;
          if (tempData){
            friendList.push(tempData);
          }
        })
        return friendList;
      })
    return friendsData;
  } catch (err) {
    console.error(err);
    return;
  }
};