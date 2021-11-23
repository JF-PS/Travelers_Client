import { useState, useCallback } from "react";
import userService from "../services/UserServices";
import { checkCrossing } from "../utils/checkCrossing";
import { isEmpty } from "lodash";

const useUsersStore = () => {
  const [travelersData, setTravelersData] = useState([]);

  const searchTravelersAround = useCallback((userLocation, userId) => {
    userService.findTravelersAround(userLocation).then((travelers) => {
      console.log(travelers);
      if (userId) {
        var travelersArround = travelers.data.map((x) => x);
        var result = {};
        travelersArround.forEach((trav) => {
          console.log(trav.location.coordinates[0]);
          if (
            trav.id === userId &&
            (trav.location.coordinates[0] !== userLocation.lat ||
              trav.location.coordinates[1] !== userLocation.lng)
          ) {
            trav.location.coordinates[0] = userLocation.lat;
            trav.location.coordinates[1] = userLocation.lng;
          }
        });
        result = travelersArround;
      } else result = travelers.data;

      setTravelersData(checkCrossing(result));
    });
  }, []);

  const updateUserLocation = useCallback((userUpdate) => {
    console.log(userUpdate);

    const findUserToUpdate = (travelersArround) => {
      travelersArround.forEach((traveler) => {
        if (
          traveler.id === userUpdate.id &&
          (traveler.location.coordinates[0] !== userUpdate.lat ||
            traveler.location.coordinates[1] !== userUpdate.lng)
        ) {
          traveler.location.coordinates[0] = userUpdate.lat;
          traveler.location.coordinates[1] = userUpdate.lng;
        }
      });

      return checkCrossing(travelersArround);
    };

    setTravelersData((current) => {
      if (isEmpty(current)) return current;
      return findUserToUpdate([...current]);
    });
  }, []);

  const removeUserNotAuthorize = useCallback(
    ({ user_id, start_date, end_date }) => {
      setTravelersData((current) => {
        if (isEmpty(current)) return current;

        const travelersArround = [...current];
        console.log(travelersArround);

        const removeTraveler = travelersArround.find(
          (trav) => trav.id === user_id
        );

        if (travelersArround[travelersArround.indexOf(removeTraveler)]) {
          travelersArround.splice(travelersArround.indexOf(removeTraveler), 1);
          return setTravelersData(checkCrossing(travelersArround));
        } else {
          return current;
        }
      });
    },
    []
  );

  return {
    travelersData,
    searchTravelersAround,
    updateUserLocation,
    removeUserNotAuthorize,
  };
};

export default useUsersStore;
