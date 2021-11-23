import {useState, useCallback} from 'react';

const useViewportMap = () => {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height:"calc(100vh - 56px)",
        zoom: 10
    });

    const handleViewportChange = useCallback((newViewport) => setViewport(newViewport),[]);

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            setViewport(newViewport);
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        [handleViewportChange]
    );

    const handleOnResult = (event) => {
        console.log(event.result.geometry.coordinates)
    };

    return { 
        handleGeocoderViewportChange, 
        handleOnResult,
        viewport,
        setViewport,
        handleViewportChange
    };
};

export default useViewportMap;