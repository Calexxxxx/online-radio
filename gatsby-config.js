require("dotenv").config()

const workboxConfig = {
  runtimeCaching: [
    {
      // Use cacheFirst since these don't need to be revalidated (same RegExp
      // and same reason as above)
      urlPattern: /(\.js$|\.css$|static\/)/,
      handler: `CacheFirst`
    },
    {
      // page-data.json files are not content hashed
      urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
      handler: `NetworkFirst`
    },
    {
      // Add runtime caching of various other page resources
      urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
      handler: `StaleWhileRevalidate`
    },
    {
      // Google Fonts CSS (doesn't end in .css so we need to specify it)
      urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
      handler: `StaleWhileRevalidate`
    }
  ],
  // Set skipWaiting to false. That's the only change in config.
  skipWaiting: false,
  clientsClaim: true
}

module.exports = {
  siteMetadata: {
    title: `Online Radio Streams`,
    description: ``,
    author: ``,
    siteUrl: `https://onlineradiostreams.net`,
    keywords: `Online Radio, Internet Radio, Online radio streams, radio online, free internet radio`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${ __dirname }/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Online Radio Streams`,
        short_name: `O.R.S`,
        start_url: `/`,
        background_color: `#1e7fab`,
        theme_color: `#1e7fab`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
        stylesProvider: {
          injectFirst: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Source Sans Pro\:200, 300, 400`,
          `Roboto\:200, 300, 400`
        ],
        display: "swap"
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
        defer: true,
        cookieDomain: "https://onlineradiostreams.net"
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve(`./src/sw.js`),
        workboxConfig
      }
    }
  ]
}
