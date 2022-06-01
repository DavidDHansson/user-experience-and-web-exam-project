import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import LogoBottom from '@icons/SKRRT2.svg'


const Footer = ({ siteTitle }) => (
    
    <div className="footer-bar-wrapper">
        <div className="inner">
            <h5>© 2022 SMB Inc.</h5>
            <div className="mid-side">
                <LogoBottom className="logo-footer" id="SKRRT"/>
                <h5>For lyf</h5>    
            </div>
            <h5>Dansk</h5>
        </div>
    </div>  
);

// Footer.propTypes = {
//     siteTitle: PropTypes.string,
// }

// Footer.defaultProps = {
//     siteTitle: ``,
// }

export default Footer
