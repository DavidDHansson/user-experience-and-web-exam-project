import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import logo from "../images/SKRRT.svg"
import profile from "../images/Vector.svg"
import burgermenu from "../images/burgermenu.svg"
import '../components/navbar.css'

const Header = ({ siteTitle }) => (
    <div className="header-navigation-wrapper">
            <div className="navigation-content">
                <img src={burgermenu} className="navbar-menu"/>
                <img src={logo} />
                <img src={profile} className="navbar-profile"/>
            </div>
    </div>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
