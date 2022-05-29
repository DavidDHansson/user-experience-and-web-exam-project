import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SwipeButton from "./../components/SwipeButton"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Header from "../components/header"
import Footer from "../components/footer"
import '../components/index.module.css'
import herobanner from '../images/racing.png'
import { StaticImage } from "gatsby-plugin-image"
import logo from '../images/SKRRT2.svg'


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
        <div className="head-text">
        
        <div className='text-on-image'>
        <img src={herobanner} alt="Hero banner" className="hero-banner" />
            <h1> Lej en bil, men ikke hvilken som helst bil.</h1>
        </div>
            
         {/* <StaticImage imgClassName="backgroundImage" src="../images/racing.png" alt="Hero banner"/>  */}
         </div>
         <img src={logo} className="logo-bottom" />
            <div className="aboveFooter">
                <h2> Har du brug for hjælp?</h2>
                <h3> Lorem ipsum dolor sit amat.</h3>
            </div>
         <button className="button" >Læs vores F.A.Q.</button>
        
            <Footer />
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
