/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.powflick.com/',
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
                allow: ['/'],
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
            'https://www.powflick.com/sitemap-1.xml',
        ],
    },
};
