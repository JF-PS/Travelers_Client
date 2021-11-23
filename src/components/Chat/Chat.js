import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState, useMemo } from "react"
import io from "socket.io-client"
import "./style.css"
import chatService from "../../services/ChatService"
import { isEmpty } from 'lodash';
import Layout from '../Layout/Layout'

const Chat = (user2) => {
	const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])
	const user = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);
	const socketRef = useRef();
	const [chatId, setChatId] = useState(0);


	useEffect(() => {
		//ici appel du service qui fera le get et le post
		chatService.getChatMessages(user.result.id, user2.match.params.idUser2).then((messages) => {
			if(!isEmpty(messages.data)) {
				console.log(messages);
				var messagesArray = [];
				messages.data.forEach((message) => {
					setChatId(message.chat_id);
					console.log()
					if(message.content) {
						const mess = { message: message.content, name: message.user.first_name }
						messagesArray.push(mess)
					}
				})
				setChat(messagesArray);
			}
			else {
				chatService.createChat().then((chat) => {
					setChatId(chat.data.id);
					chatService.postMessages({
						content: null,
						user_id: user.result.id,
						chat_id: chat.data.id,
						recipient_id: user2.match.params.idUser2
					});
					chatService.postMessages({
						content: null,
						user_id: user2.match.params.idUser2,
						chat_id: chat.data.id,
						recipient_id: user.result.id
					});
				});
			}
		});
	}, [user.result.id, user2.match.params.idUser2]);

	useEffect(
		() => {

			socketRef.current = io.connect("https://jfps-21-10-1999.herokuapp.com", {
				withCredentials: false,
				extraHeaders: {
				  origins: "allowedOrigins"
				},
				transports : ['websocket']
			});

			// Todo : Recup only message from user id 2
			socketRef.current.on("message", ({ name, message }) => {
				console.log(name);
				setChat([ ...chat, { name, message } ])
			});

			socketRef.current.on("connect_error", (err) => {
				console.log(`connect_error due to ${err.message}`);
			});

			return () => socketRef.current.disconnect()
		},
		[chat]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		if (user) {
			console.log(chatId);
			const { message } = state
			socketRef.current.emit("message", {
				message,
				name: user.result.first_name,
				userId: user.result.id,
				chatId: chatId,
				recipientId: user2.match.params.idUser2
			})
			e.preventDefault()
			setState({ message: "", name: user.result.first_name })
		}
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<>
			<Layout>
					<div className="card">
					<form onSubmit={onMessageSubmit}>
						<h1>Messenger</h1>
						<div className="name-field">
							<TextField name="name" onChange={(e) => onTextChange(e)} value={(user) ? user.result.first_name : ''} label="Name" />
						</div>
						<div>
							<TextField
								name="message"
								onChange={(e) => onTextChange(e)}
								value={state.message}
								id="outlined-multiline-static"
								variant="outlined"
								label="Message"
							/>
						</div>

						{(user) ? (
							<button>Send Message</button>
						) : (
							<p>Vous êtes pas connecté</p>
						)}


					</form>
					<div className="render-chat">
						<h1>Chat Log</h1>
						{renderChat()}
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Chat;