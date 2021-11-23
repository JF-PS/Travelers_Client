import React from "react";
import { Popup } from "react-map-gl";
import ButtonGeneric from "../ButtonGeneric/ButtonGeneric";
import { useHistory } from "react-router-dom";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import PublicIcon from "@mui/icons-material/Public";

const BubbleMap = ({ selectedTraveler, setSelectedTraveler, user }) => {
  const history = useHistory();
  const chat = (idUser2) => {
    history.push(`/chat/${idUser2}`);
  };

  console.log(user);

  return (
    <>
      {selectedTraveler && (
        <Popup
          latitude={selectedTraveler.location.coordinates[0]}
          longitude={selectedTraveler.location.coordinates[1]}
          onClose={() => {
            setSelectedTraveler(null);
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "16px", color: "#3F3979" }}>
              {user &&
                user.result.id === selectedTraveler.id &&
                user.result.geolocalisation &&
                !user.result.geolocalisation.authorization && <VpnLockIcon />}

              {user &&
                user.result.id === selectedTraveler.id &&
                user.result.geolocalisation &&
                user.result.geolocalisation.authorization && <PublicIcon />}

              {user && user.result.id === selectedTraveler.id
                ? "Moi"
                : `${selectedTraveler.first_name} ${selectedTraveler.last_name}`}
            </h2>
            {user &&
              user.result.id === selectedTraveler.id &&
              user.result.geolocalisation &&
              !user.result.geolocalisation.authorization && (
                <p style={{ fontSize: "12px" }}>Partage de position bloqué.</p>
              )}

            {user &&
              user.result.id === selectedTraveler.id &&
              user.result.geolocalisation &&
              user.result.geolocalisation.authorization && (
                <p style={{ fontSize: "12px" }}>Partage de position public.</p>
              )}
          </div>

          {user && user.result.id !== selectedTraveler.id && (
            <>
              <div onClick={() => chat(selectedTraveler.id)}>
                <ButtonGeneric
                  name={"Contacter"}
                  backgroundColor={"#EBA701"}
                  color={"#FFFFFF"}
                  variant={"contained"}
                  borderRadius={"50px"}
                  width={"100%"}
                  height={"30px"}
                  style={{ display: "flex-end" }}
                />
              </div>
            </>
          )}
        </Popup>
      )}
    </>
  );
};

export default BubbleMap;
