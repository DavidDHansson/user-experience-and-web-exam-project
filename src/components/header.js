import * as React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import MenuIcon from '@icons/menu-icon.svg'
import LogoIcon from '@icons/logo.svg'
import UserIcon from '@icons/user-icon.svg'

const Header = ({ siteTitle }) => (
    <div id="masthead">
      <nav role="navigation">
        <div className="grid-container">
          <div className="inner">
            <div onClick={() => navigate("/")}><MenuIcon className="menu-icon" /></div>
            <div onClick={() => navigate("/")}><LogoIcon className="logo"/></div>
            <div onClick={() => navigate("/")}><UserIcon className="user-icon" /></div>
          </div>
        </div>
      </nav>
    </div>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
