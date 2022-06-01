import React, { useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import SwipeButton from "@components/SwipeButton";
import { navigate } from "gatsby";
import { getCarFromId } from "@services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, startBooking, getUserFromUserUUID } from "@services/firebase";

const Rent = () => {

    const [car, setCar] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const carId = query.get("id");

        if (user) {
            getUserFromUserUUID(user.uid)
                .then(data => setUserEntry(data));
        }

        if (carId) {
            getCarFromId(carId)
                .then(data => {
                    if (data) {
                        setCar(data);
                        setIsLoaded(true);
                    }
                });
        }
    }, [user]);

    if (isLoaded && userEntry && !userEntry.data.isRenting && !car.isBooked) {
        return (
            <div className="rent-page">
                <StaticImage className="rent-bg" src="../assets/images/rent-bg.jpg" alt="background of two cars"/>

                <div className="content">

                    <div className="title-group">
                        <img className="car-image" src={isLoaded && car.imageURL} alt="The car that you're renting"/>
                        <h6 className="license">{isLoaded && car.licensePlate}</h6>
                        <h1 className="title">{isLoaded && car.name}</h1>
                    </div>

                    <div className="stats">
                      <div className="stat">
                        <p>{car.stats.gasType}</p>
                        <p>{car.stats.gas}</p>
                      </div>
                      <div className="stat">
                        <p>Årgang</p>
                        <p>{car.stats.year}</p>
                      </div>
                      <div className="stat">
                        <p>HP</p>
                        <p>{car.stats.hp}</p>
                      </div>
                      <div className="stat">
                        <p>0-100 km/t</p>
                        <p>{car.stats.acceleration}</p>
                      </div>
                    </div>

                    <div className="swiper-group">
                        <h4 className="price gradient-text">6,95 kr. <span> / min</span></h4>
                        {isLoaded && <SwipeButton startText="Bekræft, start tur." endText="Tak, din tur er startet" onSuccess={() => {
                            setTimeout(() => {
                                startBooking(car.id, user.uid);
                                navigate("/is-renting?id=" + car.id);
                            }, 1000);
                        }} />}
                    </div>
                </div>
            </div>
        );
    } else if (user && userEntry && userEntry.data.isRenting) {
        return (
            <div>
                <p>Please stop you booking before renting a new car</p>
                <button onClick={() => navigate("/is-renting?id=" + userEntry.data.currentlyRenting)}>TJEK DIN NUVÆRENDE BOOKING</button>
            </div>
        );
    } else if (isLoaded && car.isBooked) {
        return <div>Car is already booked</div>;
    } else if (!user || error) {
        return (
            <>
                <div>Du skal være logget ind for at booke en bil</div>
                <button onClick={() => navigate("/profile")}>Gå til login side</button>
            </>
        );
    } else {
        return <div>Loading... Hvis der er gået mere end 5 sekunder, så prøv igen</div>
    }
}

export default Rent;
