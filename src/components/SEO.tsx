import { useEffect } from 'react';
import { useRouter } from '../lib/router';
import { useData } from '../data/store';

export function SEO() {
  const { pathname } = useRouter();
  const { pujas } = useData();

  useEffect(() => {
    let title = 'Burdwan Pujo Guide | Durga Puja Pandals, Map & Routes';
    let description = 'Explore the ultimate Burdwan Durga Puja 2026 guide. Discover famous pandals, themes, locations, walking routes, and an interactive map for Bardhaman.';
    let canonical = 'https://burdwanpujo.pages.dev' + pathname;
    
    let schemaType = 'WebSite';
    let schemaJson: any = {};

    const isPujaRoute = pathname.startsWith('/puja/');
    const slug = isPujaRoute ? decodeURIComponent(pathname.slice(6)) : '';
    const pandal = isPujaRoute ? pujas.find(p => p.slug === slug) : null;

    switch (pathname) {
      case '/':
        title = 'Burdwan Pujo Guide | Durga Puja Pandals, Map & Routes';
        description = 'Burdwan Pujo Guide – Discover Durga Puja pandals, locations, map, routes, themes, and celebrations across Bardhaman (Burdwan). Plan your Puja visit today!';
        schemaType = 'WebSite';
        schemaJson = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Burdwan Pujo Guide",
          "url": "https://burdwanpujo.pages.dev/",
          "description": "Local guide to Durga Puja pandals in Burdwan/Bardhaman.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://burdwanpujo.pages.dev/pujas?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };
        break;
      case '/pujas':
        title = 'Burdwan Durga Puja Pandals 2026 | Pandal List & Themes';
        description = 'Browse the ultimate list of Durga Puja pandals in Burdwan. Discover 2026 themes, locations, and top attractions across Bardhaman.';
        break;
      case '/map':
        title = 'Burdwan Puja Pandal Map 2026 | Durga Puja Guide';
        description = 'Interactive map of Burdwan Durga Puja pandals. Find locations, plan your route, and explore Bardhaman Puja attractions.';
        break;
      case '/timeline':
        title = 'Durga Puja Timeline 2026 | The Five Days in Burdwan';
        description = 'Explore the schedule and rituals of the five days of Durga Puja in Burdwan, from Shasthi to Dashami.';
        break;
      case '/featured':
        title = 'Best Durga Puja Pandals in Burdwan 2026 | Featured List';
        description = 'Check out the most spectacular, award-winning, and featured Durga Puja pandals in Burdwan/Bardhaman for 2026.';
        break;
      case '/bardhaman':
        title = 'About Bardhaman | Explore Burdwan City Durga Puja';
        description = 'Learn about the heritage and culture of Bardhaman (Burdwan) and its deep-rooted connection to the grand celebration of Durga Puja.';
        break;
      case '/planner':
        title = 'Burdwan Puja Route Planner 2026 | Smart Itineraries';
        description = 'Plan your perfect pandal hopping route in Burdwan. Get smart transit times, walking paths, and top itineraries for Durga Puja.';
        break;
      case '/top3':
        title = 'Community Top 3 Pandals | Burdwan Puja Voting 2026';
        description = 'Vote for your favorite Burdwan Durga Puja pandal. View the live community leaderboard for the best pandals in Bardhaman.';
        break;
      case '/faq':
        title = 'Burdwan Puja FAQ | Frequently Asked Questions';
        description = 'Find answers to frequently asked questions about Burdwan Durga Puja, pandal locations, routing, and voting.';
        break;
      case '/survival':
        title = 'Durga Puja Survival Kit | Burdwan Emergency & Transit Guide';
        description = 'Essential visitor information for Burdwan Durga Puja. Find toto stands, emergency numbers, and survival tips for heavy crowds.';
        break;
    }

    if (isPujaRoute && pandal) {
      title = `${pandal.name} | Burdwan Durga Puja 2026`;
      description = `Visit ${pandal.name} during Burdwan Durga Puja 2026. Theme: ${pandal.theme || 'Traditional'}. Located in ${pandal.area}, Bardhaman.`;
      
      schemaType = 'Event';
      schemaJson = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `${pandal.name} - Durga Puja 2026`,
        "startDate": "2026-10-16",
        "endDate": "2026-10-20",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": pandal.name,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Burdwan",
            "addressRegion": "West Bengal",
            "addressCountry": "IN"
          }
        },
        "description": description,
        "image": pandal.heroImage
      };
      if (pandal.lat && pandal.lng) {
        schemaJson.location.geo = {
          "@type": "GeoCoordinates",
          "latitude": pandal.lat,
          "longitude": pandal.lng
        };
      }
    }

    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Update Open Graph tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgTag('og:title', title);
    setOgTag('og:description', description);
    setOgTag('og:url', canonical);
    setOgTag('og:type', isPujaRoute ? 'article' : 'website');
    if (isPujaRoute && pandal) {
      setOgTag('og:image', 'https://burdwanpujo.pages.dev' + pandal.heroImage);
    } else {
      setOgTag('og:image', 'https://burdwanpujo.pages.dev/og-image.jpg');
    }

    // Update JSON-LD Schema
    let schemaScript = document.getElementById('seo-schema') as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script') as HTMLScriptElement;
      schemaScript.id = 'seo-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = Object.keys(schemaJson).length > 0 ? JSON.stringify(schemaJson) : '';

  }, [pathname, pujas]);

  return null;
}



