import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Abovefooter = () => (
    
    <div className="aboveFooter">
        <div className="logo-bottom">
            <StaticImage src="../images/SKRRT2.svg" alt="Logo" /> 
        </div>
        <h2> Har du brug for hjælp?</h2>
        <h3> Lorem ipsum dolor sit amat.</h3>
        <button className="button" >Læs vores F.A.Q.</button>
    </div>
)

export default Abovefooter
