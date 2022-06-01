import { auth, logOut, getHistoryAndUserFromUUID } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";

const History = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user) {
            getHistoryAndUserFromUUID(user.uid)
                .then(data => {
                    setUserEntry(data.user);
                    setHistory(data.history);
                });
        }
    }, [user]);

    const getTimeLength = (entry) => {
        if (entry) {
            const startTime = entry.startTime.toDate().getTime();
            const endTime = entry.endTime ? entry.endTime.toDate().getTime() : (new Date().getTime());
            return Math.floor(((endTime - startTime) / 1000) / 60); 
        } else {
            return 0;
        }
    };

    if (userEntry && !loading && !error) {
        return (
            <div className="history-page">
                <div className="grid-container">
                    <div className="history-list">
                        <h1 className="text-center">Historik</h1>
                        {history && history.reverse().map((entry, index) => (
                            <div key={index} className="history-item">
                                <h6 className="gradient-text">{entry.startTime.toDate().toDateString()}</h6>
                                <h4 className="title">{entry.name}</h4>
                                <div className="stats">
                                    <div className="stat">
                                        <p>Regnr</p>
                                        <p>{entry.licensePlate}</p>
                                    </div>
                                    <div className="stat">
                                        <p>Længde</p>
                                        <p>{getTimeLength(entry)} m</p>
                                    </div>
                                    <div className="stat">
                                        <p className="gradient-text">Beløb</p>
                                        <p className="gradient-text">{Math.floor(entry.price)} kr.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return <div> Loading... </div>
    }
}

export default History
