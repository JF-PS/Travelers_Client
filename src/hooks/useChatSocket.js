import {useEffect, useState, useCallback} from 'react';
import chatService from "../services/ChatService"
import { isEmpty } from 'lodash';
import io from "socket.io-client";

let socket;
let chatId = null;

const useChatSocket = () => {
    const [currentMessage, setCurrentMessage] = useState({ message: "", name: "" })
	const [chat, setChat] = useState([])
	

    useEffect(() => {

        socket = io(process.env.REACT_APP_URL_API_VOYAGEUR, {
            withCredentials: false,
            extraHeaders: {
                origins: "allowedOrigins"
            },
            enabledTransports: ['websocket', 'ws', 'wss'],
            transports: ['websocket', 'ws', 'wss']
        });

        // Todo : Recup only message from user id 2
        socket.on("message", ({ name, message, userId, chatId, recipientId }) => {
            setChat((cuurent) => [ ...cuurent, { name, message, userId, chatId, recipientId } ])
		});

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

    }, []);

    useEffect(() => {
            console.log(chat);
    }, [chat]);

    const InitChat = useCallback((idUser1, idUser2)=> {
        console.log(chat);
        chatService.getChatMessages(idUser1, idUser2).then((messages) => {
			if(!isEmpty(messages.data)) {
				var messagesArray = [];
				messages.data.forEach((message) => {
                    chatId = message.chat_id;
					if(message.content) {
						const mess = { 
                            name: message.user.first_name,
                            message: message.content,
                            userId: message.user_id,
                            chatId:message.chat_id,
                            recipientId: message.recipient_id
                          }
						messagesArray.push(mess)
					}
				})
				setChat(messagesArray);
			}
			else {
				chatService.createChat().then((chat) => {
                    chatId = chat.data.id;
					chatService.postMessages({
						content: null,
						user_id: idUser1,
						chat_id: chat.data.id,
						recipient_id: idUser2
					});
					chatService.postMessages({
						content: null,
						user_id: idUser2,
						chat_id: chat.data.id,
						recipient_id: idUser1
					});
				});
			}
		});
    }, []);

    const EmitMessage = useCallback((name, message, userId, recipientId)=> {
        socket.emit("SendMessage", {
            name, message, userId, chatId, recipientId
        })
        setCurrentMessage({ message: "", name })
    }, []);

    return { 
        InitChat, 
        EmitMessage,
        chat,
        chatId,
        currentMessage, 
        setCurrentMessage
    };
};

export default useChatSocket;