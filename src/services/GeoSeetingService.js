import Axios from 'axios';

const API = Axios.create({ baseURL: `${process.env.REACT_APP_URL_API_VOYAGEUR}/geolocalisations` });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

class GeoSeetingService {

    updateGeoAuthorization(bodyRequest) {
        return new Promise((resolve, reject) => {
            API.put(`/allowloc`, bodyRequest).then((response) => {
                console.log(response);
              resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

}

const geoSetting = new GeoSeetingService();
export default geoSetting;