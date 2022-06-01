import React, { useState } from "react";
import AboveFooter from "@components/AboveFooter";
import { auth, logOut, getHistoryAndUserFromUUID } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { navigate } from "gatsby";

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();
    const [history, setHistory] = useState([]);

    useState(() => {
        if (user) {
            console.log("update");
            getHistoryAndUserFromUUID(user.uid)
                .then(data => { setUserEntry(data.user); setHistory(data.history); });
        }
    }, [user]);

    if (user && userEntry && !loading && !error) {
        return (
            <>
                <h1>{user.displayName}</h1>
                <div>You are already logged in</div>
                <button onClick={() => logOut()}>Log ud</button> <br />
                {userEntry.data.isRenting && (<button onClick={() => navigate("/is-renting?id=" + userEntry.data.currentlyRenting)}>TJEK DIN NUVÆRENDE BOOKING</button>)}
                {history && history.map((entry, index) => (
                    <p key={index}>{entry.car}</p>
                ))}
            </>
        );
    } else if (!user && userEntry && !loading) {
        return (
            <>
                <p>Du er ikke logged ind</p>
                <button onClick={() => navigate("/login")}>Gå til login side</button>
            </>
        );
    } else {
        return (<p>Loading</p>);
    }

}

export default Profile;
