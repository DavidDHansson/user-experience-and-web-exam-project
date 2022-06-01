import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import SwipeButton from "@components/SwipeButton";
import { navigate } from "gatsby";
import { getCarFromId } from "@services/firebase.js";
import { useInterval } from 'react-interval-hook';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, stopBooking, getActiveBooking } from "@services/firebase";

const IsRenting = () => {

    const [car, setCar] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [user, error] = useAuthState(auth);

    const [time, setTime] = useState(0);
    const [formattedTime, setFormattedTime] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const carId = query.get("id");

        if (carId) {
            getCarFromId(carId)
                .then(data => {
                    if (data) {
                        setCar(data);
                        setIsLoaded(true);
                    }
                });
        }

        if (user) {
            getActiveBooking(user.uid)
                .then(data => {
                    if (data) {
                        const startTime = data.startTime.toDate().getTime();
                        const now = new Date().getTime();
                        const diff = Math.floor((now - startTime) / 1000);
                        setTime(diff);
                    }
                });
        }
    }, [user]);

    useInterval(() => {
        setTime(time + 1);

        let sec = time % 60;
        let min = Math.floor(time / 60);
        let hour = Math.floor(time / 60 / 60);

        let string = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        setFormattedTime(string)
    });

    if (isLoaded && user) {
        return (
            <div className="rent-page">
                <StaticImage className="rent-bg" src="../assets/images/rent-bg.jpg" alt="Background of two cars" />

                <div className="content">
                    <div className="title-group">
                        <img className="car-image" src={car.imageURL} alt="the car you're renting" />
                        <h6 className="license">{car.licensePlate}</h6>
                        <h1 className="title">{car.name}</h1>
                    </div>

                    <div className="counter">
                        <h2>{formattedTime}</h2>
                    </div>

                    <div className="swiper-group">
                        <h4 className="price gradient-text">{car.price} kr. <span>/ min</span></h4>

                        <SwipeButton startText="Afslut turen" endText="Tak" onSuccess={() => {
                            setTimeout(() => {
                                stopBooking(user.uid);
                                navigate("/receipt");
                            }, 1000)
                        }} />
                    </div>
                </div>
            </div>
        );
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

export default IsRenting