import React, { Component } from "react"
import { graphql } from "gatsby"
import * as PropTypes from "prop-types"
import Layout from "components/Layouts/Layout"

const propTypes = {
    data: PropTypes.object.isRequired,
}

class BlogPost extends Component {

    render() {
        const post = this.props.data.contentfulBlogPost
        const { title, body } = post
        return (
            <Layout>
                <h1>{title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: body.childMarkdownRemark.html,
                    }}
                />
            </Layout>
        )
    }
}

BlogPost.propTypes = propTypes

export default BlogPost

export const pageQuery = graphql`
query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
        title
        body {
            childMarkdownRemark {
                html
            }
        }
    }
}
`