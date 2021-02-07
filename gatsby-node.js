const path = require("path")
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if ( node.internal.type === `ContentfulRadioStation` ) {
    const slug = `${ node.stationSlug }`

    createNodeField({
      node,
      name: `slug`,
      value: slug,
      title: node.title
    })
  }

  if ( node.internal.type === `ContentfulPodcast` ) {
    const slug = `${ node.podcastSlug }`

    createNodeField({
      node,
      name: `slug`,
      value: slug,
      title: node.title
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query {
        allContentfulRadioStation {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        allContentfulPodcast(filter: {node_locale: {eq: "en"}}) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  const stations = result.data.allContentfulRadioStation.edges

  stations.forEach(({ node, next, prev }) => {
    createPage({
      path: `/station/${ node.fields.slug }`,
      component: path.resolve(`./src/templates/station.js`),
      context: {
        slug: `${ node.fields.slug }`,
        next,
        prev
      }
    })
  })

  const podcasts = result.data.allContentfulPodcast.edges

  podcasts.forEach(({ node, next, prev }) => {
    createPage({
      path: `/podcast/${ node.fields.slug }`,
      component: path.resolve(`./src/templates/podcast.js`),
      context: {
        slug: `${ node.fields.slug }`,
        next,
        prev
      }
    })
  })
}