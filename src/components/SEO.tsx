import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
    const siteTitle = 'Dev-Link';
    const siteUrl = 'https://devv-link.web.app';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Dev-Link: Developer's Premium Glassmorphism Link Tree";
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`;
    const ogUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <link rel="canonical" href={ogUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:site_name" content={siteTitle} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
}
