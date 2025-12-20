import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({ title, description, image = '/og-image.png', url }: SEOProps) {
    const siteTitle = 'Dev-Link';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || "Dev-Link: Developer's Premium Glassmorphism Link Tree"} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || "Dev-Link: Developer's Premium Glassmorphism Link Tree"} />
            {image && <meta property="og:image" content={image} />}
            {url && <meta property="og:url" content={url} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || "Dev-Link: Developer's Premium Glassmorphism Link Tree"} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
}
