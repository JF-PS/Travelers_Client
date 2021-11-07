import AbstractService from "./AbstractService";
import Axios from 'axios';

const API = Axios.create({ baseURL: 'https://jfps-21-10-1999.herokuapp.com/users' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});
  

class UserService extends AbstractService {

    async signIn(formData) {

        let promise;

        await API.post("/signin", formData).then(
            (response) => {
                promise = this.getRequest(response, true);
            }
        );

        return promise;
    }

    async signUp(formData) {

        let promise;

        await API.post("/signup", formData).then(
            (response) => {
                promise = this.getRequest(response, true);
            }
        );

        return promise;
    }

    
    async findTravelersAround(location) {
        let promise;

        await API.get(`/travelersArround/${location.lat}/${location.lng}`).then(
            (response) => {
                promise = this.getRequest(response, true);
            }
        );

        return promise;
    }
}

const userService = new UserService();
export default userService;