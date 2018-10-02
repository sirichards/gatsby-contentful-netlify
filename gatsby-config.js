module.exports = {
	siteMetadata: {
		title: 'Contentful + Gatsby + Netlify',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: `zay2hx1t09mg`,
				accessToken: `4777fc5d724e1378a0c6f7de5cae1d26fd5de094941fb0b6cf516fe71d213ea9`,
			},
		},
		{
		resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-126789750-1",
				// Puts tracking script in the head instead of the body
				head: false,
				// Setting this parameter is optional
				// anonymize: true,
				// Setting this parameter is also optional
				// respectDNT: true,
				// Enables Google Optimize using your container Id
				optimizeId: "GTM-5T7WGCQ",
				// Any additional create only fields (optional)
				// sampleRate: 5,
				// siteSpeedSampleRate: 10,
				// cookieDomain: "example.com",
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'gatsby-starter-default',
				short_name: 'starter',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline',
	],
}