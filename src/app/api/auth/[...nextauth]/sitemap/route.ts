import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, getAllProductSlugs } from 'services/Products';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export async function GET(req: NextRequest) {
    try {
        const ids = await getAllProductSlugs();
        const productLinksFromIds = ids.map((id: string) => ({
            url: `/products/${id}`,
            changefreq: 'daily',
            priority: 0.8
        }));

        const categories = await getAllCategories();
        const categoryLinks = categories.map((category: string) => ({
            url: `/products?categories=${category}`,
            changefreq: 'weekly',
            priority: 0.7
        }));

        // Combina los enlaces de productos y categorías
        const links = [...categoryLinks, ...productLinksFromIds];

        // Crea un stream de Sitemap
        const stream = new SitemapStream({ hostname: 'https://4thesports.com' });

        // Convierte el stream a una promesa y obtiene el XML
        const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then((data: any) => data.toString());

        // Devuelve la respuesta con el XML del sitemap
        return new NextResponse(xmlString, {
            headers: { 'Content-Type': 'application/xml' },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
}
