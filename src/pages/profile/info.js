
import { auth, getUserFromUserUUID, addFundsToUser } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";

const Info = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (user) {
            getUserFromUserUUID(user.uid)
                .then(data => {
                    setUserEntry(data.data);
                    setBalance(Math.round(data.data.balance));
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
                            <p className="h4">{balance} kr.</p>
                            <button onClick={() => { addFundsToUser(100, user.uid); setBalance(balance+100) }} className="button">Tilføj 100 kr.</button>
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
