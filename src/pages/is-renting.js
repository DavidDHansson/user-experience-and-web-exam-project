import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import SwipeButton from "@components/SwipeButton"
import { navigate } from "gatsby"
import { getCarFromId } from "@services/firebase.js";

const IsRenting = () => {

    const [car, setCar] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const carId = query.get("id");
        getCarFromId(carId)
            .then(data => {
                setCar(data);
                setIsLoaded(true);
            });
    }, []);

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
                    <h2>00:00:00</h2>
                </div>

                <div className="swiper-group">
                    <h4 className="price gradient-text">6,95 kr. <span> / min</span></h4>

                    <SwipeButton startText="Afslut turen" endText="Tak" onSuccess={() => {
                        setTimeout(() => {
                            navigate("/receipt")
                        }, 1000)
                    }} />
                </div>

            </div>

        </div>
    );
}

export default IsRenting