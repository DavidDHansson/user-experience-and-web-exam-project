import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import SwipeButton from "@components/SwipeButton"
import { navigate } from "gatsby"

const Rent = () => (
    <div className="rent-page">
      <StaticImage className="rent-bg" src="../assets/images/rent-bg.jpg" />

      <div className="content">

        <div className="title-group">
          <StaticImage className="car-image" src="../assets/images/hellcat.png" />
          <h6 className="license">DDK8892892</h6>
          <h1 className="title">Challanger Hellcat</h1>
        </div>

        <div className="stats">
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

          <SwipeButton startText="Bekræft, start tur." endText="Tak, din tur er startet" onSuccess={ () => {
            setTimeout(() => {
              navigate("/is-renting/")
            }, 1000)
          }} />
        </div>

      </div>

    </div>
)

export default Rent