import {useState, useCallback} from 'react';
import Axios from 'axios';
const API = Axios.create({ baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' });

const useMapboxGeocoding = () => {
    const [localePlace, setLocalePlace] = useState({});

    const callMaboxGeocoding = useCallback((keyWord) => {
        API.get(`${keyWord}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`).then((response) => {
            setLocalePlace({ 
                place_name: response.data.features[0].place_name,
                coordinates: response.data.features[0].geometry.coordinates
            });
        })
    }, []);

    return { 
        callMaboxGeocoding,
        localePlace,
        setLocalePlace
    };
};

export default useMapboxGeocoding;