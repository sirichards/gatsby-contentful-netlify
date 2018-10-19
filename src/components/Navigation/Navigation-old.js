// import React, { Component } from 'react'
// import { Link, graphql, StaticQuery } from 'gatsby'

// class Navigation extends Component {
    
//     constructor(props) {
//         super(props)
//     }

//     link(item) {

//         if (item.customUrl === true && item.fields.url !== null) {
//             return(
//                 <a href={item.fields.url} rel="noreferrer noopener" target="_blank">{item.title}</a>
//             )
//         } else {
//             return(
//                 <Link to={`/${item.page.fields.path === null ? '/' : item.page.fields.path}/`}
//                     style={{
//                         color: 'white'
//                     }}
//                 >{item.title}</Link>
//             )
//         }

//     }

//     render() {

//         const { data } = this.props
//         // Get main nav from cms (should only be 1 so grab first)
//         const mainNavItems = data.allContentfulMainNavigation.edges[0].node.navigationElements

//         return (
//             <ul style={{
//                 margin: '0 auto',
//                 maxWidth: 960,
//                 padding: '0px 1.0875rem 1.45rem',
//                 paddingTop: 0
//             }}>
//                 {mainNavItems.map((item) => (
//                         <li key={item.id}>
//                             {this.link(item)}
//                             {item.subNavigationItems !== null &&
//                                 <ul>
//                                     {item.subNavigationItems.map((item) => (
//                                             <li key={item.id}>
//                                                 {this.link(item)}
//                                             </li>
//                                         ))
//                                     }
//                                 </ul>
//                             }
//                         </li>
//                     ))
//                 }
//             </ul>
//         )
//     }

// }

// export default props => (
//     <StaticQuery
//         query={graphql`
//             query {
//                 allContentfulMainNavigation {
//                     edges {
//                         node {
//                             navigationElements {
//                                 id
//                                 title
//                                 customUrl
//                                 page {
//                                     fields {
//                                         path
//                                     }
//                                 }
//                                 fields {
//                                     url
//                                 }
//                                 subNavigationItems {
//                                     id
//                                     title
//                                     customUrl
//                                     page {
//                                         fields {
//                                             path
//                                         }
//                                     }
//                                     fields {
//                                         url
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         `}
//         render={data => <Navigation data={data} {...props} />}
//     />
// )