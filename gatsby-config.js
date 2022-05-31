const autoprefixer = require('autoprefixer');

module.exports = {
    siteMetadata: {
        title: `Gatsby Default Starter`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
        siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
          resolve: `gatsby-plugin-sass`,
          options: {
            implementation: require("node-sass"),
            postCssPlugins: [autoprefixer()],
            sassOptions: {
              precision: 6,
            },
          },
        },
        {
          resolve: `gatsby-plugin-alias-imports`,
          options: {
            alias: {
              "@components": "src/components",
              "@icons": "src/assets/icons",
              "@assets": "src/assets",
              "@images": "src/assets/images"
            },
            extensions: [
              "js",
            ],
          }
        },
        {
          resolve: "gatsby-plugin-react-svg",
          options: {
            rule: {
              include: /assets/ // See below to configure properly
            }
          }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                // This will impact how browsers show your PWA/website
                // https://css-tricks.com/meta-theme-color-and-trickery/
                // theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/icons/favicon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
