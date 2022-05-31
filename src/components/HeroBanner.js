import * as React from "react"
import heroVideo from "@images/hero-video.mp4"

const HeroBanner = ({}) => (
    <section className="herobanner">
      <video autoPlay="true" muted="true" loop="true" src={heroVideo}></video>
      <div className="inner">
        <div className="grid-container">
          <div className="grid-x">
            <div className="small-12 medium-8 large-6">
              <h6 className="sub-title">Skrrt.</h6>
              <h1>Lej en bil, men ikke hvilken som helst bil.</h1> 
            </div>
          </div>
        </div>
      </div>
    </section>
)

export default HeroBanner
