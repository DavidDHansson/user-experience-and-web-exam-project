import * as React from "react"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as style from "./header.scss"
import MenuIcon from '@icons/menu-icon.svg'
import LogoIcon from '@icons/logo.svg'
import UserIcon from '@icons/user-icon.svg'

const Header = ({ siteTitle }) => (
    <div id="masthead">
      <nav role="navigation">
        <div className="grid-container">
          <div className="inner">
            <MenuIcon />
            <LogoIcon />
            <UserIcon />
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
