
import { auth, getUserFromUserUUID } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";

const Info = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user) {
            getUserFromUserUUID(user.uid)
                .then(data => {
                    setUserEntry(data.data);
                });
        }
    }, [user]);

    if (userEntry && !loading && !error) {
        return (
            <div className="info-page">
                <div className="grid-container">
                    <div className="inner">
                        <h1 className="text-center">Info</h1>
                        <div className="balance-group text-center">
                            <h6 className="gradient-text">Balance</h6>
                            <p className="h4">{userEntry.balance} kr.</p>
                            <button className="button">Tilføj 100 kr.</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Restricted</div>
    }
}

export default Info
