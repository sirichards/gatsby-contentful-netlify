import React, { Component } from "react"
import { graphql } from "gatsby"
import * as PropTypes from "prop-types"
import Layout from "components/Layouts/Layout"
import ContentBlocks from "components/ContentBlocks/ContentBlocks"

const propTypes = {
    data: PropTypes.object.isRequired,
}

class Page extends Component {
    render() {
        const data = this.props.data.contentfulPage
        const { title } = data
        return (
            <Layout>
                <h1>{title}</h1>
                {/* {data.acf.flexible_content_page !== null &&
                    <ContentBlocks data={data} />
                }   */}
            </Layout>
        )
    }
}

Page.propTypes = propTypes

export default Page

export const pageQuery = graphql`
query($id: String!) {
    contentfulPage(id: { eq: $id }) {
        title
    }
}
`