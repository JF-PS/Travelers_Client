import React, { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = 'https://jf-api-socket-test.herokuapp.com/'

let socket;

const Test = () => {
    const despare = () => {
        alert("emit despare");
        socket.emit("userLocation", { id: 1, lat: 1188, lng: 2299 });
      }
      
      useEffect(() => {
        socket = io(ENDPOINT);
        despare();
    
        socket.on("travelersNewLocation", ({ id, lat, lng }) => {
          alert("reception ocation");
          
          console.log("*******************************************************************");
          console.log("Sockette activé : Détection de nouvelle position");
          console.log("*******************************************************************");
    
          console.log(id, lat, lng)
      });
    
        return () => {
          setInterval(() => { despare()}, 15000);
        }
      }, []);
    
      return (
        <div>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>

                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
                <h1>Ceci est un test</h1>
        </div>
      );
}

export default Test
