import * as React from "react"

import { signIn, logOut } from "./../services/firebase";

export const SignInButton = () => (
    <button onClick={() => signIn()}>Sign in</button>
);

export const LogOutButton = () => (
    <button onClick={() => logOut()}>Log out</button>
);
