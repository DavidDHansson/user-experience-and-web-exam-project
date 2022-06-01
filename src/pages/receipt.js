import { StaticImage } from "gatsby-plugin-image";
import * as React from "react"

import Seo from "../components/seo"

const Receipt = () => (
    <div className="receiptpage">
        <Seo title="Receipt page" />
        <div className="content">
            <StaticImage src="../assets/images/flueben.png" className="checkmark"/>
            <div className="title">
                <h6>Kvittering</h6>
                <h1>Tak, fordi du brugte <span className="gradient-text">Skrrt.</span></h1>
            </div>
            <div className="receipt">
                <div className="line">
                    <p className="left">Regnr.:</p>
                    <p className="right">DK1234</p>
                </div>

                <div className="line">
                    <p className="left">Minutpris:</p>
                    <p className="right">DK1234</p>
                </div>


                <div className="line">
                    <p className="left">Længde på tur:</p>
                    <p className="right">DK1234</p>
                </div>
            <div className="seperator"></div>

            <div className="line">
                    <p className="left">betalt:</p>
                    <p className="right">DK1234</p>
                </div>

                <div className="line">
                    <p className="left">Din balance:</p>
                    <p className="right">DK1234</p>
                </div>

            </div>
            <a href="/" className="button secondary">Gå til forside </a>
        </div>

        
    </div>
)

export default Receipt;
