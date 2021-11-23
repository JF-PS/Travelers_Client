import React, { useEffect, useMemo } from 'react';
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
import ChatStyle from './ChatStyle';
import useChatSocket from "../../hooks/useChatSocket";

export default function ChatUi(user2) {
  const classes = ChatStyle;
  const {InitChat, EmitMessage, chat, currentMessage, setCurrentMessage} = useChatSocket();
  const user = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);

  useEffect(() => {
    InitChat(user.result.id, user2.match.params.idUser2);
  }, [InitChat, user, user2]);

  const handleTextChange = (e) => {
		setCurrentMessage({ ...currentMessage, [e.target.name]: e.target.value })
	}

  const handleMessageSubmit = (e) => {
		if (user) {
			const { message } = currentMessage
      EmitMessage(
				user.result.first_name,
        message,
				user.result.id,
				user2.match.params.idUser2
      );
      e.preventDefault()
		}
	}

  return (
    <>
      <Paper sx={classes.paper}>
        <Paper id="style-1" sx={classes.messagesBody}>
          {chat.map(({ name, message, userId}, index) => (
           <div key={`div${index}`} >
              {((userId === user.result.id) ? (
                <MessageRight
                  key={index}
                  message={message}
                  // timestamp="MM/DD 00:00"
                  // photoURL=""
                  displayName={name}
                  avatarDisp={true}
                />
              ) : (
                <MessageLeft
                  key={index}
                  message={message}
                  // timestamp="MM/DD 00:00"
                  // photoURL=""
                  displayName={name}
                  avatarDisp={true}
                />
              ))}
            </div>
          ))}
        </Paper>
        <TextInput handleMessageSubmit={handleMessageSubmit} handleTextChange={handleTextChange} currentMessage={currentMessage} />
      </Paper>
    </>
    
  );
}
