import React, { useEffect, useState } from "react";
import { auth, logOut, getHistoryAndUserFromUUID } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { navigate } from "gatsby";

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user) {
            getHistoryAndUserFromUUID(user.uid)
                .then(data => { setUserEntry(data.user); setHistory(data.history); });
        }
    }, [user]);

    const logOutAndNavigate = () => {
        logOut();
        navigate("/");
    }

    if (userEntry && !loading && !error) {
        return (
            <div className="profile-page">
              <div className="grid-container text-center">
                <h1>Hej, {user.displayName}.</h1>
                <div className="buttons">
                  <button onClick={() => {navigate('/profile/oplysninger')}} className="small-12 medium-4 button">Oplysninger</button>
                  <button onClick={() => {navigate('/profile/historik')}} className="small-12 medium-4 button">Historik</button>
                  <button className="small-12 medium-4 button secondary" onClick={() => logOutAndNavigate()}>Log ud</button>
                </div>
                {/* {userEntry.data.isRenting && (<button onClick={() => navigate("/is-renting?id=" + userEntry.data.currentlyRenting)}>TJEK DIN NUVÆRENDE BOOKING</button>)}
                {history && history.map((entry, index) => (
                    <p key={index}>{entry.car}</p>
                ))} */}
              </div>
            </div>
        );
    } else if (!user && !loading) {
        return (
            <>
              <div className="grid-container text-center">
                <h1>Du er ikke logged ind</h1>
                <button className="button" onClick={() => navigate("/login")}>Gå til login side</button>
              </div>
            </>
        );
    } else {
        return (<p>Loading</p>);
    }

}

export default Profile;
