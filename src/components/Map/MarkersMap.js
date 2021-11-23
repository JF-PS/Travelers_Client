import React from "react";
import { Marker } from "react-map-gl";
import { isEmpty } from "lodash";

import RoomIcon from "@mui/icons-material/Room";

const MarkersMap = ({ travelersData, user, setSelectedTraveler }) => {
  return (
    <>
      {user &&
        user.result.geolocalisation &&
        !user.result.geolocalisation.authorization && (
          <Marker
            key={user.result.id}
            latitude={user.result.location.coordinates[0]}
            longitude={user.result.location.coordinates[1]}
          >
            <span
              onClick={(e) => {
                e.preventDefault();
                setSelectedTraveler(user.result);
              }}
            >
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundColor: "rgba(108, 122, 137, 0.7)",
                  borderRadius: 50,
                }}
              >
                <RoomIcon
                  style={{
                    fontSize: 35,
                    color: "#FFFFFF",
                    display: "flex",
                    margin: "auto",
                    paddingTop: "6px",
                  }}
                />
              </div>
            </span>
          </Marker>
        )}

      {!isEmpty(travelersData) &&
        travelersData.map((traveler) => (
          <Marker
            key={traveler.id}
            latitude={traveler.location.coordinates[0]}
            longitude={traveler.location.coordinates[1]}
          >
            <span
              onClick={(e) => {
                e.preventDefault();
                setSelectedTraveler(traveler);
              }}
            >
              {user && traveler.id === user.result.id ? (
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "rgba(63, 57, 121, 0.7)",
                    borderRadius: 50,
                  }}
                >
                  <RoomIcon
                    style={{
                      fontSize: 35,
                      color: "#FFFFFF",
                      display: "flex",
                      margin: "auto",
                      paddingTop: "6px",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "rgba(235, 167, 1, 0.7)",
                    borderRadius: 50,
                  }}
                >
                  <RoomIcon
                    style={{
                      fontSize: 35,
                      color: "#FFFFFF",
                      display: "flex",
                      margin: "auto",
                      paddingTop: "6px",
                    }}
                  />
                </div>
              )}
            </span>
          </Marker>
        ))}
    </>
  );
};

export default MarkersMap;
