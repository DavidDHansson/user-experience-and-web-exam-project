import { auth, logOut, getHistoryAndUserFromUUID } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";

const Historik = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userEntry, setUserEntry] = useState();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user) {
            getHistoryAndUserFromUUID(user.uid)
                .then(data => { setUserEntry(data.user); setHistory(data.history); });
        }
    }, [user]);

    if (userEntry && !loading && !error) {
      return (
          <div className="historik-page">
            <div className="grid-container">
              <div className="history-list">
                <div className="history-item">
                  <h6 className="gradient-text">2. Januar</h6>
                  <h4 className="title">Challanger Hellcat</h4>
                  <div className="stats">
                    <div className="stat">
                      <p>Reg</p>
                      <p>DK018233</p>
                    </div>
                    <div className="stat">
                      <p>Pris/min</p>
                      <p>DK018233</p>
                    </div>
                    <div className="stat">
                      <p>Længde</p>
                      <p>DK018233</p>
                    </div>
                    <div className="stat">
                      <p className="gradient-text">Total</p>
                      <p className="gradient-text">DK018233</p>
                    </div>
                  </div>
                </div>
                <div className="history-item">
                  <h6 className="gradient-text">2. Januar</h6>
                  <h4 className="title">Challanger Hellcat</h4>
                  <div className="stats">
                    <div className="stat">
                      <p>Reg</p>
                      <p>DK018233</p>
                    </div>
                    <div className="stat">
                      <p>Pris/min</p>
                      <p>DK018233</p>
                    </div>
                    <div className="stat">
                      <p>Længde</p>
                      <p>DK018233</p>
                    </div>
                    <div className="stat">
                      <p className="gradient-text">Total</p>
                      <p className="gradient-text">DK018233</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    } else {
      return <div> Loading... </div>
    }
}

export default Historik
