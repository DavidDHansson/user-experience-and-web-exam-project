import React, { useState, useEffect } from 'react';
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import GoogleMapReact from 'google-map-react';
import { getCars } from "@services/firebase.js";

const Map = () => {

    const [cars, setCars] = useState([]);
    const [activeCar, setActiveCar] = useState(null);
    const [userLat, setUserLat] = useState(null);
    const [userLng, setUserLng] = useState(null);

    useEffect(() => {
        getCars()
            .then(data => setCars(data));
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLat(position.coords.latitude);
                setUserLng(position.coords.longitude);
            });
        }
    };

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

                {(userLat && userLng) && (
                    <UserLocationMarker
                        lat={userLat}
                        lng={userLng}
                    />
                )}
            </GoogleMapReact>

            <button className="current-location-button button" onClick={() => getUserLocation()}>Find egen lokation</button>


            {activeCar && (
                <div className='marker-info'>
                    {
                        /* 
                        onClick={() => setActiveCar(null)} 
                        navigate("/rent?id=" + activeCar.id)
                        */
                    }
                    <span className="exitBtn" onClick={() => setActiveCar(null)}>X</span>
                    <img src={activeCar.imageURL} alt={activeCar.name} />
                    <div className="title-group">
                        <h6 className="license">{activeCar.licensePlate}</h6>
                        <h3 className="title">{activeCar.name}</h3>
                    </div>

                    <div className="stats">
                        <div className="stat">
                            <p>{activeCar.stats.gasType}</p>
                            <p>{activeCar.stats.gas}</p>
                        </div>
                        <div className="stat">
                            <p>Årgang</p>
                            <p>{activeCar.stats.year}</p>
                        </div>
                        <div className="stat">
                            <p>HP</p>
                            <p>{activeCar.stats.hp}</p>
                        </div>
                        <div className="stat">
                            <p>0-100 km/t</p>
                            <p>{activeCar.stats.acceleration}</p>
                        </div>
                    </div>

                    {activeCar.isBooked ? (
                        <Link className="button error">Bilen er i brug <span>{activeCar.price}/min</span></Link>
                    ) : (
                      <Link to={`/rent?id=${activeCar.id}`} className="button">Lej denne bil <span>{activeCar.price}/min</span></Link>
                    )}

                </div>
            )}
        </div>
    );
};

const UserLocationMarker = () => (
    <div className="current-location-marker">
        <div className="inner">
            <div className="inner"></div>
        </div>
    </div>
);

const Marker = ({ imageURL, title, isBooked, didTapCar }) => {

    return (
        <div
            className="marker"
            onClick={didTapCar}
            style={{ opacity: isBooked ? 0.8 : 1, filter: `hue-rotate(${isBooked ? "140deg" : "0deg"})` }}>
            <div style={{ position: "relative", top: "0", left: "0" }}>
                <StaticImage style={{ position: "relative", top: "0", left: "0" }} src="../assets/images/marker.png" height={52} alt="Marker on the map"/>
                {/* <StaticImage style={{position: "absolute", top: "14", left: "0"}} src={imageURL} height={32}/> */}
            </div>
        </div>
    );
};

export default Map;