const autoprefixer = require('autoprefixer');

module.exports = {
    pathPrefix: "/user-experience-and-web-exam-project",
    siteMetadata: {
        title: `SKRRT`,
        description: `SKRRT`,
        author: `Anders, David, Lauge, Robin og Vitus`,
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
              "@images": "src/assets/images",
              "@services": "src/services"
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
              include: /assets/
            }
          }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `minimal-ui`,
                icon: `src/assets/icons/favicon.png`,
            },
        },
    ],
}
