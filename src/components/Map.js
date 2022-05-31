import React, { useState, useEffect } from 'react';
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from "gatsby"
import GoogleMapReact from 'google-map-react';
import { getCars } from "@services/firebase.js";

const Map = () => {

    const [cars, setCars] = useState([]);
    const [activeCar, setActiveCar] = useState(null);

    useEffect(() => {
        getCars()
            .then(data => {
                setCars(data);
                console.log(data);
            });
    }, []);

    const didTapCar = (index) => setActiveCar(cars[index]);

    return (
        <div className="map-wrapper">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={{ lat: 55.6616636, lng: 12.5913907 }}
                defaultZoom={11}
                className="map"
            >
                {cars && cars.map((car, index) =>
                    <Marker
                        lat={car.location.latitude}
                        lng={car.location.longitude}
                        key={index}
                        imageURL={car.imageURL}
                        title={car.name}
                        isBooked={car.isBooked}
                        didTapCar={() => didTapCar(index)}
                    />
                )}
            </GoogleMapReact>

            {activeCar && (
                <div className='marker-info'>
                    <p>{activeCar.name}</p>
                    <p style={{color: "red"}} onClick={() => setActiveCar(null)}>X</p>
                    <button onClick={() => navigate("/rent?id=" + activeCar.id)}>Lej denne bil</button>
                </div>
            )}
        </div>
    );
};

const Marker = ({ imageURL, title, isBooked, didTapCar }) => {

    return (
        <div
            className="marker"
            onClick={didTapCar}
            style={{ opacity: isBooked ? 0.8 : 1, filter: `hue-rotate(${isBooked ? "140deg" : "0deg"})` }}>
            <div style={{ position: "relative", top: "0", left: "0" }}>
                <StaticImage style={{ position: "relative", top: "0", left: "0" }} src="../assets/images/marker.png" height={51} />
                {/* <StaticImage style={{position: "absolute", top: "14", left: "0"}} src={imageURL} height={32}/> */}
            </div>
        </div>
    );
};

export default Map;