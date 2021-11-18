import React, { useEffect, useState, useMemo } from 'react';
import useGeoLocation from "../../hooks/useGeoLocation";
import userService from "../../services/UserServices";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import io from "socket.io-client"
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom';
import BeigeRoundedBtn from "../Buttons/BeigeRoundedBtn";
import "./style.css"

const ENDPOINT = 'https://jfps-21-10-1999.herokuapp.com/';
// const ENDPOINT = 'http://localhost:4000/';

let socket;

const Map = (props) => {
    const user = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);
    const [travelersData, setTravelersData] = useState([]);
    const [selectedTraveler, setSelectedTraveler] = useState(null);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height:"calc(100vh - 56px)",
        zoom: 10
    });
    const {location, callLocation} = useGeoLocation();
    const [change, setChange] = useState({});
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();
    const chat = (idUser2) => {
        history.push(`/chat/${idUser2}`);
    };


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
                console.log("Emit =====>")
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

    const { children } = props;

    return (
        <>
                {/* <div>
                    {JSON.stringify(travelersData)}
                    {JSON.stringify(viewport)}
                    {JSON.stringify(selectedTraveler)}
                </div> */}
                <ReactMapGL
                   {...viewport}
                   mapboxApiAccessToken="pk.eyJ1IjoibW9yZ2FuZWR1bHVjIiwiYSI6ImNrdnc1MGRyejA3NDcyb3A0ZDBvZnJoOHIifQ.oKbJN0xnJQvYgfOfcSZzyw"
                   mapStyle="mapbox://styles/morganeduluc/ckw559ao4894l14pa9xtjwyj2"
                //    mapStyle="mapbox://styles/morganeduluc/ckvuuvnfd3czk14o2ud5bv6w6?optimize=true"
                // hfdjn

                   onViewportChange={viewport => { setViewport(viewport); }}
                   onLoad={() => setLoaded(true)}
               >
                {
                (!isEmpty(travelersData)) 
                && (travelersData.map(traveler => (
                    <Marker key={traveler.id} latitude={traveler.lat} longitude={traveler.lng}>
                        <span onClick={e => { e.preventDefault(); setSelectedTraveler(traveler); }} >
                        {((user) && (user.message !== "Something went wrong") && (traveler.id === user.result.id)) ? (                                                      
                                <LocationOnSharpIcon style={{ fontSize: 40, color: '#3F3979', backgroundColor: 'rgba(235, 167, 1, 0.7)', borderRadius: 50 }} />
                            ) : (
                                <LocationOnSharpIcon style={{ fontSize: 40, color: '#FFFFFF', backgroundColor: 'rgba(235, 167, 1, 0.7)', borderRadius: 50 }} />
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
                            <h1>{selectedTraveler.id}</h1>
                                <h2>{`${selectedTraveler.first_name} ${selectedTraveler.last_name}`}</h2>
                                <p>{`lat : ${selectedTraveler.lat} lng : ${selectedTraveler.lng}`}</p>

                                {(user) && (
                                    <>
                                        <div onClick={() => chat(selectedTraveler.id)}>
                                            <BeigeRoundedBtn
                                                name={"Contacter"}
                                                backgroundColor={"#FAF3F0"}
                                                color={"#EABF9F"}
                                                variant={"contained"}
                                                borderRadius={"50px"}
                                                borderColor={"#EABF9F"}
                                            />
                                        </div>
                                    </>
                                )}

                            </div>
                        </Popup>
                   )}

                {children}

               </ReactMapGL>
        </>
    );
};

export default Map;