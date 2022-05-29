import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SwipeButton from "./../components/SwipeButton"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Header from "../components/header"
import '../components/index.module.css'
import Shrek from '../images/shrek.png'
import { StaticImage } from "gatsby-plugin-image"


const IndexPage = () => {

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      console.log("Update: " + user);

      if(user) {
        // startBooking("Vju2HRXd58lTHSoLXlTr", user.uid);
        // stopBooking(user.uid);
      }
    }, [user])
    
    return (
        
        <div>
            <Header />
        <h1> Lej en bil, men ikke hvilken som helst bil.</h1>

        <StaticImage imgClassName="backgroundImage" src="../images/shrek.png" alt="A Shrek"/>
        </div>

        
        // <Layout>
        //     <SwipeButton text={"Bestil bil"} onSuccess={() => console.log("tes")}/>
        //     <Seo title="Home" />
        //     <Link to={"page-2"}>Page 2</Link> <br />
        //     <Link to={"using-dsg"}>Using dsg</Link>

        //     <br />
        //     <br />
        //     <div>
        //         {(loading || error) ? <p>Loading...</p> : <SignInButton />}
        //         {(loading || error) ? <p>Loading...</p> : <LogOutButton />}
        //         {
        //             user && (
        //                 <>
        //                     <button onClick={() => startBooking("Vju2HRXd58lTHSoLXlTr", user.uid)}>Start</button>
        //                     <button onClick={() => stopBooking(user.uid)}>Stop</button>
        //                 </>
        //             )
        //         }
        //     </div>
        // </Layout>
    );
};

export default IndexPage
