import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SwipeButton from "./../components/SwipeButton"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

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
        <Layout>
            <Seo title="Home" />
            <Link to={"page-2"}>Page 2</Link> <br />
            <Link to={"using-dsg"}>Using dsg</Link>

            <br />
            <SwipeButton text={"Bestil bil"} onSuccess={() => console.log("tes")}/>
            <br />
            <div>
                {(loading || error) ? <p>Loading...</p> : <SignInButton />}
                {(loading || error) ? <p>Loading...</p> : <LogOutButton />}
                {
                    user && (
                        <>
                            <button onClick={() => startBooking("Vju2HRXd58lTHSoLXlTr", user.uid)}>Start</button>
                            <button onClick={() => stopBooking(user.uid)}>Stop</button>
                        </>
                    )
                }
            </div>
        </Layout>
    );
};

export default IndexPage
