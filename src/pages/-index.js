import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'components/Layouts/Layout'

class IndexPage extends Component {

	render() {

		// const links = this.props.data.allContentfulBlogPost.edges.map(({ node }, index) => {
		// 	return (
		// 		<Link to={`/posts/${node.slug}`} key={index}>
		// 			<h1>{node.title}</h1>
		// 		</Link>
		// 	)
		// })

		return(
			<Layout>
				<h1>Hi people</h1>
				<p>Welcome to your new Gatsby.</p>
				{/* {links} */}
			</Layout>
		)
	}

}
	
export default IndexPage

// export const query = graphql`
// query {
// 	allContentfulBlogPost {
// 		edges {
// 			node {
// 				title
// 				slug
// 			}
// 		}
// 	}
// }
// `