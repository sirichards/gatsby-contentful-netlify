import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = ({data}) => (
	<Layout>
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<Link to="/page-2/">Go to page 2</Link>
		{data.allContentfulBlogPost.edges.map(({ node }, index) => (
			<h2 key={index}>{node.title} / {node.slug}</h2>
		))}
	</Layout>
)
	
export default IndexPage

export const query = graphql`
query {
	allContentfulBlogPost {
		edges {
			node {
				title
				slug
			}
		}
	}
}
`