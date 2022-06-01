import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import SwipeButton from "@components/SwipeButton"
import { navigate } from "gatsby"
import { getCarFromId } from "@services/firebase.js";
import { useInterval } from 'react-interval-hook';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, stopBooking } from "@services/firebase";

const IsRenting = () => {

    const [car, setCar] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [time, setTime] = useState(0);
    const [formattedTime, setFormattedTime] = useState("");
    const [user, error] = useAuthState(auth);

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
    }, []);

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
                <StaticImage className="rent-bg" src="../assets/images/rent-bg.jpg" />

                <div className="content">
                    <div className="title-group">
                        <StaticImage className="car-image" src="../assets/images/hellcat.png" />
                        <h6 className="license">DDK8892892</h6>
                        <h1 className="title">Challanger Hellcat</h1>
                    </div>

                    <div className="counter">
                        <h2>{formattedTime}</h2>
                    </div>

                    <div className="swiper-group">
                        <h4 className="price gradient-text">6,95 kr. <span> / min</span></h4>

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