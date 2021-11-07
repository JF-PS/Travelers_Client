// import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useState } from 'react';
import useGeoLocation from "../../hooks/useGeoLocation";
import userService from "../../services/UserServices";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
// import io from "socket.io-client"
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';

const Map = () => {

    // const [openMap, setOpenMap] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [travelersData, setTravelersData] = useState([]);
    const {location, callGeoLocation} = useGeoLocation();
    const [markers, setMarkers] = useState(<></>);
    // var socketRef = useRef();
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        zoom: 10
    });
    // socketRef.current = io.connect("http://localhost:4000", {
    //     withCredentials: false,
    //     extraHeaders: {
    //     origins: "allowedOrigins"
    //     },
    //     transports : ['websocket']
    // });

    

    const [selectedTraveler, setSelectedTraveler] = useState(null);

    // useEffect(() => {
    //     if(Object.keys(travelersData).length !== 0) {

    //         socketRef.current.on("travelersNewLocation", ({ id, lat, lng }) => {
    //             var travelersArround = travelersData;
    //             travelersArround.forEach(traveler => {
    //                 if(traveler.id === id && (traveler.lat !== lat || traveler.lng !== lng)) {
    //                     console.log(`${traveler.first_name} à émis une nouvelle position.`);
    //                     console.log(`Son ancienne position : ${traveler.lat} ${traveler.lng}`);
    //                     console.log(`Sa nouvelle position : ${lat} ${lng}`);
    //                     traveler.lat = lat;
    //                     traveler.lng = lng;
    //                     travelersArround[travelersArround.indexOf(traveler)].lat = lat;
    //                     travelersArround[travelersArround.indexOf(traveler)].lng = lng;
    //                 }
    //             });

    //             setTravelersData(travelersArround);
    //         });

    //         socketRef.current.on("connect_error", (err) => {
    //             console.log(`connect_error due to ${err.message}`);
    //         });

    //         return () => socketRef.current.disconnect()
    //     }
        
    // });

    useEffect(() => {
        callGeoLocation();
        const listener = e => {
            if (e.key === "Escape") {
            setSelectedTraveler(null);
            }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    useEffect(() => {
        if(location.loaded) {
            // update info in the server
            // if(user && user.message !== "User doesn't exist") {
            //     socketRef.current.emit("userLocation", { id: user.result.id, lat: location.coordinates.lat, lng: location.coordinates.lng });
            // }
			// socketRef.current.on("connect_error", (err) => {
			// 	console.log(`connect_error due to ${err.message}`);
			// });

            // update info in the map
            setViewport((vp) => ({ ...vp, latitude: location.coordinates.lat, longitude: location.coordinates.lng }));
            userService.findTravelersAround(location.coordinates).then((travelers) => {
                // if(user && user.message !== "User doesn't exist") {
                //     user.result.location = location.coordinates
                //     travelers.data.push({
                //         id: user.result.id,
                //         first_name: user.result.first_name,
                //         last_name: user.result.last_name,
                //         lat: location.coordinates.lat,
                //         lng: location.coordinates.lng
                //     });
                // }
                setTravelersData(travelers.data);
            });

            // return () => socketRef.current.disconnect()
        }
    }, [location]);

    useEffect(() => {
        if(location.loaded && travelersData && Object.keys(travelersData).length !== 0) {
            const myMarkers = travelersData.map(traveler => (
                <Marker key={traveler.id} latitude={traveler.lat} longitude={traveler.lng}>
                    <span onClick={e => { e.preventDefault(); setSelectedTraveler(traveler); }} >
                        {((user) && (traveler.id === user.result.id)) ? (
                            <PersonPinCircleOutlinedIcon style={{ fontSize: 40, color: '#1E90FF' }} />
                        ) : (
                            <PersonPinCircleOutlinedIcon style={{ fontSize: 40, color: '#724b15' }} />
                        ) }
                    </span>
                </Marker>
            ));
            setMarkers(myMarkers);
            // setOpenMap(true);
        }
    }, [travelersData]);

    return (
        <>
            {/* {(openMap) && ( */}
                <ReactMapGL
                   {...viewport}
                   mapboxApiAccessToken="pk.eyJ1IjoiamYtcHMiLCJhIjoiY2t2aHZ6a202MmdlbDMxcGd1czlsZGd6aSJ9.2WKXsUcIweQ1TTha53hBhg"
                   mapStyle="mapbox://styles/jf-ps/ckvdw1n4g25s915tfl6if73sd?optimize=true"
                   onViewportChange={viewport => { setViewport(viewport); }}
               >
                   {markers} 
   
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
            {/* )} */}
        </>
    );
};

export default Map;
