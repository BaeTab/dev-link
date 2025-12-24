import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
    type?: string;
}

export default function SEO({ title, description, image, url, keywords, type = 'website' }: SEOProps) {
    const siteTitle = 'Dev-Link';
    const siteUrl = 'https://devv-link.web.app';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "dev-link: Developer's Premium Link Tree. Showcase your GitHub, Tech Stack, and Portfolio in a stunning glassmorphism design. The best link-in-bio tool for software engineers.";
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`;
    const ogUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

    // Default Keywords for Developers
    const defaultKeywords = "developer, link tree, portfolio, github case, tech stack, software engineer, resume, dev-link, glassmorphism, web developer, frontend, backend, fullstack";

    // Combine props keywords with defaults
    const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Dev-Link",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "url": siteUrl,
        "description": defaultDescription,
        "image": ogImage,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": "Dev-Link Team"
        }
    };

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={ogUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:site_name" content={siteTitle} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:creator" content="@devlink_app" />

            {/* Structured Data for International SEO */}
            <link rel="alternate" hrefLang="en" href={siteUrl} />
            <link rel="alternate" hrefLang="ko" href={`${siteUrl}?lang=ko`} />
            <link rel="alternate" hrefLang="x-default" href={siteUrl} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
}
