import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { getHistoryFromHistoryId } from "@services/firebase";

const Receipt = () => {

    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const receiptId = query.get("id");

        if (receiptId) {
            getHistoryFromHistoryId(receiptId)
                .then(data => { setReceipt(data); console.log(data) });
        }
    }, []);

    const getTimeLength = () => {
        if (receipt) {
            const startTime = receipt.startTime.toDate().getTime();
            const endTime = receipt.endTime ? receipt.endTime.toDate().getTime() : (new Date().getTime());
            return Math.floor(((endTime - startTime) / 1000) / 60); 
        } else {
            return 0;
        }
    };

    return (
        <div className="receiptpage">
            <div className="content">
                <StaticImage src="../assets/images/flueben.png" className="checkmark" alt="checkmark" />
                <div className="title">
                    <h6>Kvittering</h6>
                    <h1>Tak, fordi du brugte <span className="gradient-text">Skrrt.</span></h1>
                </div>
                <div className="receipt">
                    <div className="line">
                        <p className="left">Regnr.:</p>
                        <p className="right">{receipt && receipt.id}</p>
                    </div>

                    <div className="line">
                        <p className="left">Minutpris:</p>
                        <p className="right">{receipt && receipt.priceMin} kr.</p>
                    </div>


                    <div className="line">
                        <p className="left">Længde på tur:</p>
                        <p className="right">{getTimeLength()} min</p>
                    </div>
                    <div className="seperator"></div>

                    <div className="line">
                        <p className="left">Betalt:</p>
                        <p className="right">{receipt && Math.floor(receipt.price)} kr.</p>
                    </div>

                </div>
                <a href="/" className="button secondary">Gå til forside </a>
            </div>
        </div>
    );
};

export default Receipt;
