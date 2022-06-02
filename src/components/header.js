import React, {useState} from "react";
import { navigate, Link } from "gatsby";
import { auth } from "@services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuIcon from '@icons/menu-icon.svg';
import LogoIcon from '@icons/logo.svg';
import UserIcon from '@icons/user-icon.svg';

const Header = () => {
    const [user] = useAuthState(auth);
    const [menuActive, setMenuActive] = useState(false);

    return (
        <div id="masthead">
            <nav role="navigation">
                <div className="inner">
                    <div><MenuIcon onClick={() => setMenuActive(!menuActive)} role="menu" className="menu-icon" /></div>
                    <div><LogoIcon onClick={() => navigate("/")} role="home" className="logo" /></div>
                    <div className={user ? "profile-wrapper" : ""} onClick={() => navigate("/profile")} role="profile">{user ? <img src={user.photoURL} className="user-icon user-loggedin-icon" alt="user icon" /> : <UserIcon className="user-icon" />}</div>
                </div>
            </nav>
            <div className={`burger-menu ${menuActive ? 'active' : ''}`}>
              <div className="exit" onClick={() => setMenuActive(!menuActive)}>X</div>
              <Link to="/" onClick={() => setMenuActive(false)}>Forside</Link>
              <Link to="/guide" onClick={() => setMenuActive(false)}>F.A.Q</Link>
              <Link to="/profile" onClick={() => setMenuActive(false)}>Min konto</Link>
            </div>
        </div>
    );
};

export default Header
