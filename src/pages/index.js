import React, { useEffect } from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import SwipeButton from "./../components/SwipeButton"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import HeroBanner from "@components/HeroBanner"
import Header from "../components/Header"
import Footer from "../components/Footer"
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
        <>
          <HeroBanner />

          <div className="aboveFooter">
          <div className="logo-bottom">
              <StaticImage src="../images/SKRRT2.svg" alt="Logo" /> 
          </div>
              <h2> Har du brug for hjælp?</h2>
              <h3> Lorem ipsum dolor sit amat.</h3>
              <button className="button" >Læs vores F.A.Q.</button>
          </div>
        </>
    );
};

export default IndexPage
