/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

/** 
 * Fix problem when fields are empty in CMS but we call the structure of content with Graphql, Gatsby are working on this issue: https://github.com/gatsbyjs/gatsby/issues/3344
 * Add default values to node fields that might be empty from CMS
**/
// const { attachFields } = require(`gatsby-plugin-node-fields`)

// // List of descriptors
// const descriptors = [
//     {
//         predicate: node => node.internal.type === 'ContentfulNavigationItem',
//         fields: [
//             {
//                 name: 'url',
//                 getter: node => node.url,
//                 defaultValue: null,
//             }
//         ]
//     }
// ]

// exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions
//     attachFields(node, createNodeField, descriptors)
// }


 // Extend Contentful pages graphql response to include full page path based on child pages
exports.sourceNodes = ({ getNodes, actions }) => {
    const { createNodeField } = actions;

    // Get nodes that are pages
    const pageNodes = getNodes().filter(
        node => node.internal.type === "ContentfulPage"
    );

    // Loop each page
    pageNodes.forEach(pageNode => {
        let pathFragments = [];
        let tmpNode = pageNode;

        // While node has page___NODE (parent page) push the slug to pathFragments array
        do {
            pathFragments.push(tmpNode.slug);
            if (typeof tmpNode.page___NODE === 'object') {
                tmpNode = pageNodes.find( node => {
                    return node.id === tmpNode.page___NODE[0]
                });
            } else {
                tmpNode = false
            }
        } while (tmpNode);

        // Create path by joining all slugs divided with a /
        const path = pathFragments.reverse().join("/");
        
        // Add path field to contentful page node accessible through graphql
        createNodeField({
            node: pageNode,
            name: `path`,
            value: path
        });
    });

};


// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        // The “graphql” function allows us to run arbitrary
        // queries against the local Contentful graphql schema. Think of
        // it like the site has a built-in database constructed
        // from the fetched data that you can run queries against.
        graphql(
            `
                {
                    allContentfulPage {
                        edges {
                            node {
                                id
                                fields {
                                    path
                                }
                            }
                        }
                    }
                }
            `
        ).then(result => {
            if (result.errors) {
                reject(result.errors)
            }

            // Create Category pages
            const pageTemplate = path.resolve(`./src/templates/page.js`)
            // We want to create a detailed page for each
            // category node. We'll just use the Contentful id for the slug.
            _.each(result.data.allContentfulPage.edges, edge => {
                // Gatsby uses Redux to manage its internal state.
                // Plugins and sites can use functions like "createPage"
                // to interact with Gatsby.
                createPage({
                    // Each page is required to have a `path` as well
                    // as a template component. The `context` is
                    // optional but is often necessary so the template
                    // can query data specific to each page.
                    path: `/${edge.node.fields.path}/`,
                    component: slash(pageTemplate),
                    context: {
                        id: edge.node.id,
                    },
                })
            })

            resolve()
        })
    })
}