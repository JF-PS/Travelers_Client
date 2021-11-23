import Axios from 'axios';

const API = Axios.create({ baseURL: `${process.env.REACT_APP_URL_API_VOYAGEUR}/users` });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

class UserService {

    signIn(formData) {
        return new Promise((resolve, reject) => {
            API.post("/signin", formData).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    signUp(formData) {
        return new Promise((resolve, reject) => {
            API.post("/signup", formData).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    updateUserProfil(formData, id) {
        return new Promise((resolve, reject) => {
            API.put(`/updateuser/${id}`, formData).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }


    findTravelersAround(location) {
        return new Promise((resolve, reject) => {
            API.get(`/travelersArround/${location.lat}/${location.lng}`).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            API.delete(`/deleteuser/${id}`).then((response) => {
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}

const userService = new UserService();
export default userService;