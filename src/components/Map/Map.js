import React, { useEffect, useState, useMemo, useRef } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import useLocationSocket from "../../hooks/useLocationSocket";
import useUsersStore from "../../hooks/useUsersStore";
import useMapboxGeocoding from "../../hooks/useMapboxGeocoding";
import useViewportMap from "../../hooks/useViewportMap";
import ReactMapGL from "react-map-gl";
import MarkersMap from "./MarkersMap";
import BubbleMap from "./BubbleMap";
import SearchBar from "../SearchBar/SearchBar";
import { isEmpty } from "lodash";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";

const Map = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { viewport, setViewport, handleViewportChange } = useViewportMap();
  const { location, callLocation } = useGeoLocation();
  const { callMaboxGeocoding, localePlace, setLocalePlace } =
    useMapboxGeocoding();
  const { change, EmitUserLocation, userBlocksGeo } = useLocationSocket();
  const {
    travelersData,
    searchTravelersAround,
    updateUserLocation,
    removeUserNotAuthorize,
  } = useUsersStore();
  const user = useMemo(() => JSON.parse(localStorage.getItem("profile")), []);
  const mapRef = useRef();

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") setSelectedTraveler(null);
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [setSelectedTraveler]);

  useEffect(() => {
    callLocation();
  }, [callLocation]);

  useEffect(() => {
    console.log("WTF ?");
    console.log(travelersData);
  }, [travelersData]);

  useEffect(() => {
    if (location.loaded && loaded) {
      EmitUserLocation({
        id: user && user.result.id,
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });

      searchTravelersAround(location.coordinates, user && user.result.id);

      setViewport((vp) => ({
        ...vp,
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        transitionDuration: 2000,
      }));
    }
  }, [
    location,
    loaded,
    user,
    EmitUserLocation,
    searchTravelersAround,
    setViewport,
  ]);

  useEffect(() => {
    updateUserLocation(change);
  }, [change, updateUserLocation]);

  useEffect(() => {
    if (!isEmpty(localePlace)) {
      searchTravelersAround(
        {
          lat: localePlace.coordinates[1],
          lng: localePlace.coordinates[0],
        },
        null
      );
      setViewport((vp) => ({
        ...vp,
        latitude: localePlace.coordinates[1],
        longitude: localePlace.coordinates[0],
        transitionDuration: 1000,
      }));
    } else {
      searchTravelersAround(location.coordinates, user && user.result.id);
      setViewport((vp) => ({
        ...vp,
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        transitionDuration: 1000,
      }));
    }
  }, [localePlace, setViewport, location, searchTravelersAround, user]);

  useEffect(() => {
    if (!isEmpty(userBlocksGeo)) {
      userBlocksGeo.forEach((userToBlock) => {
        removeUserNotAuthorize(userToBlock);
      });
    }
  }, [userBlocksGeo, removeUserNotAuthorize]);

  const { children } = props;

  return (
    <>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onViewportChange={handleViewportChange}
        onLoad={() => setLoaded(true)}
      >
        <MarkersMap
          travelersData={travelersData}
          user={user}
          setSelectedTraveler={setSelectedTraveler}
        />

        <BubbleMap
          selectedTraveler={selectedTraveler}
          user={user}
          setSelectedTraveler={setSelectedTraveler}
        />

        <SearchBar
          callMaboxGeocoding={callMaboxGeocoding}
          setLocalePlace={setLocalePlace}
        />

        {children}
      </ReactMapGL>
    </>
  );
};

export default Map;
