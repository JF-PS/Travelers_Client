import Axios from 'axios';

const API = Axios.create({ baseURL: process.env.REACT_APP_URL_API_VOYAGEUR });

class ChatService {

    async createChat() {
        return new Promise((resolve, reject) => {
            API.post("/chats").then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    async postMessages(dataMessages) {
        return new Promise((resolve, reject) => {
            API.post("/messages", dataMessages).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    async getChatMessages(IdUser1, IdUser2) {
        return new Promise((resolve, reject) => {
            API.get(`/messages/${IdUser1}/${IdUser2}`).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}

const chatService = new ChatService();
export default chatService;