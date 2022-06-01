import * as React from "react";
import LogoBottom from '@icons/SKRRT2.svg';

const Footer = () => (
    <div className="footer-bar-wrapper">
        <div className="inner">
            <h5>© 2022 SMB Inc.</h5>
            <div className="mid-side">
                <LogoBottom className="logo-footer" id="SKRRT" />
                <h5>For lyf</h5>
            </div>
            <h5>Dansk</h5>
        </div>
    </div>
);

export default Footer;
