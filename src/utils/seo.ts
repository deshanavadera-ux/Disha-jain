import { Article } from '../types/blog';

interface UpdateSEOMetadataOptions {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
  article?: Article;
  breadcrumbs?: { name: string; item: string }[];
}

export function updateSEOMetadata(options: UpdateSEOMetadataOptions) {
  const { title, description, canonicalPath, image, type = 'website', article, breadcrumbs } = options;

  // 1. Update Document Title
  document.title = title;

  // Helper to update or create meta tags
  const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
    let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper to update or create link tags
  const setLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://blogs-vert.vercel.app';
  const fullCanonicalUrl = `${currentOrigin}${canonicalPath}`;
  const defaultImage = `${currentOrigin}/src/assets/images/hero_ai_marketing_analytics_1791989280565.jpg`;
  const fullImageUrl = image?.startsWith('http') ? image : `${currentOrigin}${image || defaultImage}`;

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', description);
  setLinkTag('canonical', fullCanonicalUrl);

  // 3. OpenGraph Social Tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:type', type);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:image', fullImageUrl);
  setMetaTag('property', 'og:site_name', 'Blogs Vert');

  // 4. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', fullImageUrl);

  // 5. Schema.org JSON-LD structured data injection
  const existingJsonLd = document.getElementById('seo-structured-data');
  if (existingJsonLd) {
    existingJsonLd.remove();
  }

  const jsonLdScript = document.createElement('script');
  jsonLdScript.id = 'seo-structured-data';
  jsonLdScript.type = 'application/ld+json';

  const schemaGraph: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Blogs Vert',
      url: currentOrigin,
      description: 'The premier publication for digital marketing, generative AI, search optimization, and algorithmic growth.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${currentOrigin}/#search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemaGraph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${currentOrigin}${crumb.item}`,
      })),
    });
  }

  if (article) {
    schemaGraph.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.seoDescription || article.subtitle,
      image: [fullImageUrl],
      datePublished: '2026-10-12T08:00:00+00:00',
      dateModified: '2026-10-15T12:00:00+00:00',
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Blogs Vert',
        url: currentOrigin,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullCanonicalUrl,
      },
      keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
    });

    if (article.faqs && article.faqs.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }
  }

  jsonLdScript.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  });

  document.head.appendChild(jsonLdScript);
}
