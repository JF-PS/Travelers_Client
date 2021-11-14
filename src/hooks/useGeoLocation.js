import { useState, useCallback } from "react";
// import { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [currentLocation, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    // useEffect(() => {
    //     if (!("geolocation" in navigator)) {
    //         onError({
    //             code: 0,
    //             message: "Geolocation not supported",
    //         });
    //     }

    //     navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // }, []);

    const callLocation = useCallback(()=> {
        console.log("updateLocation");
        
        const onLocationSuccess = (location) => {
            // alert(`[lat : ${location.coords.latitude} | lng : ${location.coords.longitude}]`)
            setLocation({
                loaded: true,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });
        };  
    
        const onLocationError = (error) => {
            setLocation({
                loaded: true,
                error: {
                    code: error.code,
                    message: error.message,
                },
            });
        };
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
    }, [])

    return { 
        location: currentLocation, 
        callLocation
    };
};

export default useGeoLocation;