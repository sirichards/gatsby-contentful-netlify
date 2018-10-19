import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

class Navigation extends Component {
    
    constructor(props) {
        super(props)
    }

    link(item) {

        if (item.__typename === 'ContentfulNavigationExternalLink') {
            return (
                <a href={item.externalLink} 
                    rel="noreferrer noopener" 
                    target="_blank"
                    style={{
                        color: 'white'
                    }}
                >{item.title}</a>
            )
        } else {
            return(
                <Link to={`/${item.internalLink.fields.path === null ? '/' : item.internalLink.fields.path}/`}
                    style={{
                        color: 'white'
                    }}
                >{item.title}</Link>
            )
        }

    }

    render() {

        const { data } = this.props
        // Get main nav from cms (should only be 1 so grab first)
        const mainNavItems = data.allContentfulMainNavigation.edges[0].node.navigationElements

        return (
            <ul style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0
            }}>
                {mainNavItems.map((item) => (
                    <li key={item.id}>
                        {this.link(item)}
                        {item.subLinks !== null && item.subLinks !== undefined &&
                            <ul>
                                {item.subLinks.map((item) => (
                                    <li key={item.id}>
                                        {this.link(item)}
                                    </li>
                                ))}
                            </ul>
                        }
                    </li>
                ))}
            </ul>
        )
    }

}

export default props => (
    <StaticQuery
        query={graphql`
            query {
                allContentfulMainNavigation {
                    edges {
                        node {
                            navigationElements {
                                __typename
                                ... on ContentfulNavigationInternalLink {
                                    id
                                    title
                                    internalLink: link {
                                        id
                                        title
                                        fields {
                                            path
                                        }
                                    }
                                    subLinks {
                                        __typename
                                        ... on ContentfulNavigationInternalLink {
                                            id
                                            title
                                            internalLink: link {
                                                id
                                                title
                                                fields {
                                                    path
                                                }
                                            }
                                        }
                                        ... on ContentfulNavigationExternalLink {
                                            id
                                            title
                                            externalLink: link
                                        }
                                    }
                                }
                                ... on ContentfulNavigationExternalLink {
                                    id
                                    title
                                    externalLink: link
                                }
                            }
                        }
                    }
                }
            }
        `}
        render={data => <Navigation data={data} {...props} />}
    />
)