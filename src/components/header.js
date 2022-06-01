import * as React from "react";
import { navigate } from "gatsby";
import { auth } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuIcon from '@icons/menu-icon.svg';
import LogoIcon from '@icons/logo.svg';
import UserIcon from '@icons/user-icon.svg';

const Header = () => {
    const [user] = useAuthState(auth);

    return (
        <div id="masthead">
            <nav role="navigation">
                <div className="inner">
                    <div><MenuIcon onClick={() => navigate("/")} role="menu" className="menu-icon" /></div>
                    <div><LogoIcon onClick={() => navigate("/")} role="home" className="logo" /></div>
                    <div className={user ? "profile-wrapper" : ""} onClick={() => navigate("/profile")} role="profile">{user ? <img src={user.photoURL} className="user-icon user-loggedin-icon" alt="user icon" /> : <UserIcon className="user-icon" />}</div>
                </div>
            </nav>
        </div>
    );
};

export default Header
