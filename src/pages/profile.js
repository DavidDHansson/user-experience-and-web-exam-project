import * as React from "react";
import AboveFooter from "@components/AboveFooter";
import { signIn, auth, logOut } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth"

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);

    if (loading || error) {
        return <p>Loading</p>;
    } else if (user) {
        return (
            <>
                <h1>{user.displayName}</h1>
                <div>You are already logged in</div>
                <button onClick={() => logOut()}>Log ud</button>
            </>
        );
    } else {
        return (
            <div className="login-page">
                <div className="login-wrapper">
                    <h4>Log ind</h4>
                    <button className="login-button" onClick={() => signIn()}>Log ind med Google</button>
                </div>
                <AboveFooter />
            </div>
        );
    }

}

export default Profile;
