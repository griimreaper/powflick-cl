module.exports = {
    siteUrl: 'https://www.devcodelab.site/',
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
        additionalSitemaps: [
            'https://www.devcodelab.site/sitemap-1.xml',
        ]
    },
};