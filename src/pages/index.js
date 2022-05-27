import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { SignInButton, LogOutButton } from "./../components/authButtons"
import { auth, startBooking, stopBooking } from "./../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const IndexPage = () => {

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      console.log("Update: " + user);

      if(user) {
        // startBooking("Vju2HRXd58lTHSoLXlTr", user.uid);
        stopBooking(user.uid);
          
      }
    }, [user])
    
    return (
        <Layout>
            <Seo title="Home" />
            <Link to={"page-2"}>Page 2</Link> <br />
            <Link to={"using-dsg"}>Using dsg</Link>

            <br />
            <div>
                {(loading || error) ? <p>Loading...</p> : <SignInButton />}
                {(loading || error) ? <p>Loading...</p> : <LogOutButton />}
            </div>
        </Layout>
    );
};

export default IndexPage
