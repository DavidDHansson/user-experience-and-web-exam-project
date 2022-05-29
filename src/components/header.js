import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import logo from "../images/SKRRT.svg"
import profile from "../images/Vector.svg"
import burgermenu from "../images/menu-icon.svg"
import '../components/navbar.css'

const Header = ({ siteTitle }) => (
    <div className="header-navigation-wrapper">
            <div className="navigation-content">
                <p>Burgermenu</p>{/* <div className="burger-menu"><img src={burgermenu}/></div> */}
                <img src={logo} />
                <img src={profile}/>
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
