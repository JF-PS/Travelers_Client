import React, { useEffect, useState, useMemo } from 'react';
// import React, { useEffect, useRef, useState, useMemo } from 'react';
import useGeoLocation from "../../hooks/useGeoLocation";
import userService from "../../services/UserServices";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
// import mapboxgl from "mapbox-gl";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

import 'mapbox-gl/dist/mapbox-gl.css'
import io from "socket.io-client"
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import { isEmpty } from 'lodash'

const ENDPOINT = 'https://jfps-21-10-1999.herokuapp.com/'
// const ENDPOINT = 'http://localhost:8000'

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
    // var socketRef = useRef();
    const [change, setChange] = useState({});
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {

        const listener = e => {
            if (e.key === "Escape") {
                setSelectedTraveler(null);
            }
        };

        window.addEventListener("keydown", listener);

        // socketRef.current = io.connect("https://jfps-21-10-1999.herokuapp.com/", {
        //     path: '/socket.io-client',
        //     withCredentials: false,
        //     extraHeaders: {
        //         origins: "allowedOrigins"
        //     },
        //     "force new connection": true,
        //     reconnectionAttempts: "Infinity",
        //     timeout: 10000,
        //     enabledTransports: ['websocket', 'ws', 'wss'],
        //     transports: ['websocket', 'ws', 'wss']
        // });

        socket = io(ENDPOINT, {
            withCredentials: false,
            extraHeaders: {
                origins: "allowedOrigins"
            },
            "force new connection": true,
            reconnectionAttempts: "Infinity",
            timeout: 10000,
            enabledTransports: ['websocket', 'ws', 'wss'],
            transports: ['websocket', 'ws', 'wss']
        });

        socket.on("travelersNewLocation", ({ id, lat, lng }) => {
            console.log("*******************************************************************");
            console.log("Sockette activé : Détection de nouvelle position");
            setChange({ id, lat, lng });
            console.log("*******************************************************************");
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        return () => {
            setInterval(() => { callLocation()}, 15000);
            socket.disconnect();
            window.removeEventListener("keydown", listener);
        }

    }, []);

    useEffect(() => {
        callLocation();
    }, [callLocation]);

    useEffect(() => {
        if(location.loaded && loaded) {
            // update info in the server
            if(user && user.message !== "Something went wrong") {
                console.log(user);
                socket.emit("userLocation", { id: user.result.id, lat: location.coordinates.lat, lng: location.coordinates.lng });
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

            return () => socket.disconnect()
        }
    }, [location, loaded]);

    useEffect(() => {
        console.log(change);
        if((!isEmpty(travelersData)) ) {
            var travelersArround = travelersData.map(x => x);
            
            console.log("=============== avant changement =========================")
            console.log(travelersArround);

            travelersArround.forEach(traveler => {
                if(traveler.id === change.id && (traveler.lat !== change.lat || traveler.lng !== change.lng)) {
                    console.log(`${traveler.first_name} à émit une nouvelle position :`);
                    console.log(`Son ancienne position : ${traveler.lat} ${traveler.lng}`);
                    
                    // traveler.lat = change.lat;
                    // traveler.lng = change.lng;

                    travelersArround[travelersArround.indexOf(traveler)].lat = change.lat;
                    travelersArround[travelersArround.indexOf(traveler)].lng = change.lng;

    
                    console.log(`Sa nouvelle position : ${travelersArround[travelersArround.indexOf(traveler)].lat} ${travelersArround[travelersArround.indexOf(traveler)].lng}`);
                }
            });
            console.log("=============== avant changement =========================")
            console.log(travelersArround);
            setTravelersData(travelersArround);
            
        }
        
    }, [change]);

    return (
        <>
                {/* <div>{JSON.stringify(travelersData)}</div> */}
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
