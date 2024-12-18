module.exports = {
    siteUrl: 'https://front-six-smoky.vercel.app/',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: [
        '/dashboard/*',
        '/dashboard',
        '/admin',
        '/admin/*',
        '/vendor',
        '/vendor/*',
        '/api/*',
        '/api'
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: [
                    '/',
                ],
                disallow: [
                    '/dashboard/*',
                    '/dashboard',
                    '/admin',
                    '/admin/*',
                    '/vendor',
                    '/vendor/*',
                    '/api/*',
                    '/api'
                ],
            },
        ],
    },
};