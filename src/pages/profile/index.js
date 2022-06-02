import React, { useEffect, useState } from "react";
import { auth, logOut, getUserFromUserUUID } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { navigate } from "gatsby";

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();

    useEffect(() => {
        if (user) {
            getUserFromUserUUID(user.uid)
                .then(data => {setUserEntry(data); console.log(data)});
        }
    }, [user]);

    const logOutAndNavigate = () => {
        logOut()
            .then(() => navigate("/"));
    }

    if (userEntry && !loading && !error) {
        return (
            <div className="profile-page">
                <div className="grid-container text-center">
                    <h1>Hej, {user && user.displayName}.</h1>
                    <div className="buttons">
                        <button onClick={() => { navigate('/profile/info') }} className="small-12 medium-4 button">Oplysninger</button>
                        <button onClick={() => { navigate('/profile/history') }} className="small-12 medium-4 button">Historik</button>
                        {userEntry.data.isRenting && (
                            <button onClick={() => navigate("/is-renting?id=" + userEntry.data.currentlyRenting)} className="button error">Tjek din nuværende booking</button>
                        )}
                        <button className="small-12 medium-4 button secondary" onClick={() => logOutAndNavigate()}>Log ud</button>
                    </div>
                </div>
            </div>
        );
    } else if (!userEntry && !loading) {
        return (
            <>
                <div style={{ textAlign: "center", paddingTop: "20vh" }} className="grid-container text-center">
                    <div style={{ marginBottom: "40px" }}>
                        <h5>Du er ikke logged ind</h5>
                    </div>
                    <button className="button" onClick={() => navigate("/login")}>Gå til login side</button>
                </div>
            </>
        );
    } else {
        return (<p>Loading</p>);
    }

}

export default Profile;
