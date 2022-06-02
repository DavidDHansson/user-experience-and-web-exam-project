import React from "react";
import { signIn } from "@services/firebase";
import { navigate } from "gatsby";

const Login = () => {

    const signInAndNavigate = () => {
        signIn()
          .then(() => {
            navigate('/profile');
          })
          .catch(() => {
            alert('error logging in');
          })
    }

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <h5>Log ind</h5>
                <button className="login button" onClick={() => signInAndNavigate()}>Log ind med Google</button>
            </div>
        </div>
    );
};

export default Login;
