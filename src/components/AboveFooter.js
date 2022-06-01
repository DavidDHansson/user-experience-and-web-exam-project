import * as React from "react";
import LogoBottom from '@icons/SKRRT2.svg';
import { navigate } from "gatsby";

const Abovefooter = () => (
    <div className="aboveFooter">
        <div className="wrapper">
            <LogoBottom className="logo-bottom" />
            <h4>Har du brug for hjælp?</h4>
            <h5>Tryk nedenunder for hjælp.</h5>
            <button onClick={() => {navigate('/guide')}} className="button">Læs vores F.A.Q.</button>
        </div>
        
    </div>
)

export default Abovefooter;
