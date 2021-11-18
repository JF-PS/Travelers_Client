import AbstractService from "./AbstractService";
import Axios from 'axios';

const API = Axios.create({ baseURL: 'https://jfps-21-10-1999.herokuapp.com' });

class ChatService extends AbstractService {
    
    async createChat() {

        let promise;

        await API.post("/chats").then(
            (response) => {
                promise = this.getRequest(response, true);
            }
        );

        return promise;
    }

    async postMessages(dataMessages) {

        let promise;

        await API.post("/messages", dataMessages).then(
            (response) => {
                promise = this.getRequest(response, true);
            }
        );

        return promise;
    }

    async getChatMessages(IdUser1, IdUser2) {

        let promise;

        await API.get(`/messages/${IdUser1}/${IdUser2}`).then(
            (response) => {
                promise = this.getRequest(response, true);
            }
        );

        return promise;
    }
}

const chatService = new ChatService();
export default chatService;