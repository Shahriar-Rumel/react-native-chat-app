import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';

import { auth, database } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  const renderAvatar = (props) => {
    console.log(props.currentMessage.user.avatar);
    return (
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: props.currentMessage.user.avatar }}
        />
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      }}
      renderAvatar={renderAvatar}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: 10
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18
  }
});
