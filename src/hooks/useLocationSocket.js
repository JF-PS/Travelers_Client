import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

let socket;

const useLocationSocket = () => {
  const [change, setChange] = useState({});
  const [userBlocksGeo, setUserBlocksGeo] = useState([]);

  useEffect(() => {
    socket = io(process.env.REACT_APP_URL_API_VOYAGEUR, {
      withCredentials: false,
      extraHeaders: {
        origins: "allowedOrigins",
      },
      enabledTransports: ["websocket", "ws", "wss"],
      transports: ["websocket", "ws", "wss"],
    });

    socket.on("location", ({ id, lat, lng }) => {
      setChange({ id, lat, lng });
    });

    socket.on("hideLocation", ({ user_id, start_date, end_date }) => {
      setUserBlocksGeo((current) => [
        ...current,
        { user_id, start_date, end_date },
      ]);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }, []);

  const EmitUserLocation = useCallback((userLocation) => {
    if (userLocation.id) socket.emit("sendLocation", userLocation);
  }, []);

  const EmitUserLocationBlocked = useCallback((userStopGeoInfo) => {
    if (!userStopGeoInfo.authorization)
      socket.emit("sendBlockLocation", userStopGeoInfo);
  }, []);

  return {
    change,
    EmitUserLocation,
    EmitUserLocationBlocked,
    userBlocksGeo,
  };
};

export default useLocationSocket;
