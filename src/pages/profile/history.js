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

    if (userEntry && !loading && !error) {
      return (
          <div className="history-page">
            <div className="grid-container">
              <div className="history-list">
                {history && history.map((entry, index) => (
                  <div key={index} className="history-item">
                    <h6 className="gradient-text">{entry.startTime.toDate().toDateString()}</h6>
                    <h3 className="title">{entry.name}</h3>
                    <div className="stats">
                      <div className="stat">
                        <p>Regnr</p>
                        <p>{entry.licensePlate}</p>
                      </div>
                      <div className="stat">
                        <p>Længde</p>
                        <p>{Math.round((entry.endTime.toDate().getTime() - entry.startTime.toDate().getTime()) / 1000)}s</p>
                      </div>
                      <div className="stat">
                        <p className="gradient-text">Beløb</p>
                        <p className="gradient-text">{entry.price} kr.</p>
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
