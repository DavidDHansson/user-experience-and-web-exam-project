import React, { useEffect } from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import SwipeButton from "./../components/SwipeButton"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Header from "../components/header/header"
import Footer from "../components/footer"
import '../components/index.css'
import herobanner from '../images/racing.png'
import { StaticImage } from "gatsby-plugin-image"
import logo from '../images/SKRRT2.svg'


const IndexPage = () => {

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        console.log("Update: " + user);

        if (user) {
            // startBooking("Vju2HRXd58lTHSoLXlTr", user.uid);
            // stopBooking(user.uid);
        }
    }, [user])

    return (

        <main>

            <Header />

            <header className="header-wrapper">
                <StaticImage imgClassName="hero-banner" src="../images/racing.png" alt="Hero banner" /> 

                    <div className="header-title-wrapper">
                        <p> Lej en bil, men ikke hvilken som helst bil.</p>
                    </div>

            </header>


            <div className="aboveFooter">
            <div className="logo-bottom">
                <StaticImage src="../images/SKRRT2.svg" alt="Logo" /> 
            </div>
                <h2> Har du brug for hjælp?</h2>
                <h3> Lorem ipsum dolor sit amat.</h3>
                <button className="button" >Læs vores F.A.Q.</button>
            </div>

            <Footer />
        </main>
    );
};

export default IndexPage
