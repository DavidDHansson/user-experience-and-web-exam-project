import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import SwipeButton from "@components/SwipeButton"
import { navigate } from "gatsby"
import { getCarFromId } from "@services/firebase.js";

const Rent = () => {

    const [car, setCar] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let carId = window.location.href.split("=")[1]
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
                    <img className="car-image" src={isLoaded && car.imageURL} />
                    <h6 className="license">{isLoaded && car.licensePlate}</h6>
                    <h1 className="title">{isLoaded && car.name}</h1>
                </div>

                <div className="stats">
                    <div className="stat">
                        <p className="sub-title">
                            Benzin
                        </p>
                        <p className="title">
                            {isLoaded && car.range}%
                        </p>
                    </div>
                    <div className="stat">
                        <p className="sub-title">
                            Benzin
                        </p>
                        <p className="title">
                            75%
                        </p>
                    </div>
                    <div className="stat">
                        <p className="sub-title">
                            Benzin
                        </p>
                        <p className="title">
                            75%
                        </p>
                    </div>
                    <div className="stat">
                        <p className="sub-title">
                            Benzin
                        </p>
                        <p className="title">
                            75%
                        </p>
                    </div>
                </div>

                <div className="swiper-group">
                    <h4 className="price gradient-text">6,95 kr. <span> / min</span></h4>
                    {isLoaded && <SwipeButton startText="Bekræft, start tur." endText="Tak, din tur er startet" onSuccess={() => {
                        setTimeout(() => {
                            navigate("/is-renting?id=" + car.id)
                        }, 1000)
                    }}/>}
                </div>

            </div>

        </div>
    );
}

export default Rent