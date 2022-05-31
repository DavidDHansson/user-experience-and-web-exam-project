import React, { useEffect } from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import SwipeButton from "./../components/SwipeButton"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import HeroBanner from "@components/HeroBanner"
import Maps from "@components/Maps"


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
          <Maps />
        </>
    );
};

export default IndexPage
