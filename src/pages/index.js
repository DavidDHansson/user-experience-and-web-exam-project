import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import SwipeButton from "../components/SwipeButton"

const IndexPage = () => (
    <Layout>
        <Seo title="Home"/>
        <Link to={"page-2"}>Page 2</Link> <br />
        <Link to={"using-dsg"}>Using dsg</Link>

        <SwipeButton text={"Bestil bil"} onSuccess={() => console.log("tes")}/>
    </Layout>
)

export default IndexPage
