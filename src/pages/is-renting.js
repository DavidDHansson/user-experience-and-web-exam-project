import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import SwipeButton from "@components/SwipeButton"
import { navigate } from "gatsby"
import { getCarFromId } from "@services/firebase.js";
import { useInterval } from 'react-interval-hook';

const IsRenting = () => {

    const [car, setCar] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [time, setTime] = useState(0);
    const [formattedTime, setFormattedTime] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const carId = query.get("id");
        getCarFromId(carId)
            .then(data => {
                setCar(data);
                setIsLoaded(true);
            });
    }, []);

    useInterval(() => {
        setTime(time + 1);

        let sec = time % 60;
        let min = Math.floor(time / 60);
        let hour = Math.floor(time / 60 / 60);

        let string = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        setFormattedTime(string)
    });

    if(isLoaded) {
      return (
          <div className="rent-page">
              <StaticImage className="rent-bg" src="../assets/images/rent-bg.jpg" />

              <div className="content">

                  <div className="title-group">
                      <StaticImage className="car-image" src="../assets/images/hellcat.png" />
                      <h6 className="license">{}</h6>
                      <h1 className="title">Challanger Hellcat</h1>
                  </div>

                  <div className="counter">
                      <h2>{formattedTime}</h2>
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
    } else {
      return (
        <>
          <p>...</p>
        </>
      );
    }
}

export default IsRenting