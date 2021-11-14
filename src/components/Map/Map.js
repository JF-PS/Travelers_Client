import React, { useEffect, useState, useMemo } from 'react';
import useGeoLocation from "../../hooks/useGeoLocation";
import userService from "../../services/UserServices";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

import 'mapbox-gl/dist/mapbox-gl.css'
import io from "socket.io-client"
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import { isEmpty } from 'lodash'

const ENDPOINT = 'https://poc-socket.herokuapp.com/';

let socket;

const Map = () => {
    mapboxgl.workerClass = MapboxWorker;

    const user = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);
    const [travelersData, setTravelersData] = useState([]);
    const [selectedTraveler, setSelectedTraveler] = useState(null);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        zoom: 12
    });
    const {location, callLocation} = useGeoLocation();
    const [change, setChange] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        const listener = e => {
            if (e.key === "Escape") {
                setSelectedTraveler(null);
            }
        };

        window.addEventListener("keydown", listener);

        socket = io(ENDPOINT, {
            withCredentials: false,
            extraHeaders: {
                origins: "allowedOrigins"
            },
            enabledTransports: ['websocket', 'ws', 'wss'],
            transports: ['websocket', 'ws', 'wss']
        });

        socket.on('location', ({ id, lat, lng }) => {
            console.log("==========================================");
            console.log("Coordonnées reçu : ");
            console.log(id, lat, lng);
            setChange({ id, lat, lng });
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        const interval = setInterval(() => {
            callLocation();
         }, 15000);

        return () => {
            clearInterval(interval);
            // setInterval(() => { callLocation() }, 5000);
            // socketRef.current.disconnect();
            window.removeEventListener("keydown", listener);
        }

    }, []);

    useEffect(() => {
        callLocation();
    }, [callLocation]);

    useEffect(() => {
        if(location.loaded && loaded) {

            if(user && user.message !== "Something went wrong") {

                const sendLocation = { 
                    id: user.result.id, 
                    lat: location.coordinates.lat, 
                    lng: location.coordinates.lng
                }

                socket.emit('sendLocation', sendLocation);

                userService.findTravelersAround(location.coordinates).then((travelers) => {
                    var travelersArround = travelers.data.map(x => x);
                    travelersArround.forEach((trav) => {
                        if((trav.id === user.result.id) && (trav.lat !== location.coordinates.lat || trav.lng !== location.coordinates.lng)) {
                            travelersArround[travelersArround.indexOf(trav)].lat = location.coordinates.lat;
                            travelersArround[travelersArround.indexOf(trav)].lng = location.coordinates.lng;
                        }
                    })
                    setTravelersData(travelersArround);
                });
            }
            else{
                userService.findTravelersAround(location.coordinates).then((travelers) => {
                    console.log(travelers.data)
                    setTravelersData(travelers.data);
                });
            }

            // update info in the map
            setViewport((vp) => ({ 
                ...vp, latitude: 
                location.coordinates.lat, 
                longitude: location.coordinates.lng, 
                transitionDuration: 500, 
                transitionInterpolator: new FlyToInterpolator(), 
                transitionEasing: t => t * (2 - t)
            }));

            // return () => socketRef.current.disconnect()
        }
    }, [location, loaded]);

    useEffect(() => {
        console.log(change);
        if((!isEmpty(travelersData)) ) {
            var travelersArround = travelersData.map(x => x);
            travelersArround.forEach(traveler => {
                if(traveler.id === change.id && (traveler.lat !== change.lat || traveler.lng !== change.lng)) {
                    // traveler.lat = change.lat;
                    // traveler.lng = change.lng;

                    travelersArround[travelersArround.indexOf(traveler)].lat = change.lat;
                    travelersArround[travelersArround.indexOf(traveler)].lng = change.lng;
                }
            });
            setTravelersData(travelersArround);
        }
        
    }, [change]);

    return (
        <>
                <ReactMapGL
                   {...viewport}
                   mapboxApiAccessToken="pk.eyJ1IjoiamYtcHMiLCJhIjoiY2t2aHZ6a202MmdlbDMxcGd1czlsZGd6aSJ9.2WKXsUcIweQ1TTha53hBhg"
                   mapStyle="mapbox://styles/jf-ps/ckvdw1n4g25s915tfl6if73sd?optimize=true"
                   onViewportChange={viewport => { setViewport(viewport); }}
                   onLoad={() => setLoaded(true)}
               >
                {
                (!isEmpty(travelersData)) 
                && (travelersData.map(traveler => (
                    <Marker key={traveler.id} latitude={traveler.lat} longitude={traveler.lng}>
                        <span onClick={e => { e.preventDefault(); setSelectedTraveler(traveler); }} >
                            {((user) && (user.message !== "Something went wrong") && (traveler.id === user.result.id)) ? (
                                <PersonPinCircleOutlinedIcon style={{ fontSize: 40, color: '#1E90FF' }} />
                            ) : (
                                <PersonPinCircleOutlinedIcon style={{ fontSize: 40, color: '#724b15' }} />
                            ) }
                        </span>
                    </Marker>
                )))}
   
                   {(selectedTraveler) && (
                        <Popup
                            latitude={selectedTraveler.lat}
                            longitude={selectedTraveler.lng}
                            onClose={() => {
                                setSelectedTraveler(null);
                            }}
                        >
                            <div>
                                <h2>{`${selectedTraveler.first_name} ${selectedTraveler.last_name}`}</h2>
                                <p>{`lat : ${selectedTraveler.lat} lng : ${selectedTraveler.lng}`}</p>
                            </div>
                        </Popup>
                   )}
               </ReactMapGL>
        </>
    );
};

export default Map;