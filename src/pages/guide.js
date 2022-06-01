import * as React from "react";
import Header from "../components/header";

const Guide = () => (
    <div className="guide-page">
        <div className="wrapper">
            <h5>Sådan bruger du SKRRT.</h5>
            <h3>Hvordan opretter jeg en profil?</h3>
            <p>Du opretter en profil ved at logge ind på hjemmesiden med Google. Herefter vælger du, hvilken Google Acccount, du ønsker at benytte Skrrt med.</p>
            <h3>Hvordan lejer jeg en bil?</h3>
            <p>På kortet kan du se, hvilke biler, der er tilgængelige. Derefter trykker du på den bil, du ønsker at låne og starter din tur.</p>
            
            <p>Når du er færdig med din tur parkeres bilen, og du afslutter turen.</p>
            <h3>Hvordan finder jeg ud af, hvilken bil, der er tættest på mig?</h3>
            <p>Tryk på "Find egen lokation" på kortet. Dette vil placere en markør på kortet, som viser din nuværende lokation. Herfra kan du se, hvilke biler, der er i dit nærområde.</p>
        </div>
    </div>
    
)

export default Guide;