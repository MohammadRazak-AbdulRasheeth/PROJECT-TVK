import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title: string
  description: string
  keywords: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterTitle?: string
  twitterDescription?: string
  noIndex?: boolean
  structuredData?: object
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = '/images/tvk-og-image.jpg',
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  noIndex = false,
  structuredData
}) => {
  const location = useLocation()
  const baseUrl = 'https://tvkcanada.family'
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`

  useEffect(() => {
    // Set page title
    document.title = title

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMeta('description', description)
    updateMeta('keywords', keywords)
    
    // Robots meta tag
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow')
    } else {
      updateMeta('robots', 'index, follow')
    }

    // Open Graph tags
    updateMeta('og:title', ogTitle || title, true)
    updateMeta('og:description', ogDescription || description, true)
    updateMeta('og:image', `${baseUrl}${ogImage}`, true)
    updateMeta('og:url', currentUrl, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:site_name', 'TVK Canada', true)
    updateMeta('og:locale', 'en_CA', true)

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image', true)
    updateMeta('twitter:title', twitterTitle || ogTitle || title, true)
    updateMeta('twitter:description', twitterDescription || ogDescription || description, true)
    updateMeta('twitter:image', `${baseUrl}${ogImage}`, true)
    updateMeta('twitter:site', '@TVKCanada', true)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = currentUrl

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'structured-data'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }

    // Language and alternate links
    let hreflang = document.querySelector('link[rel="alternate"][hreflang="en"]') as HTMLLinkElement
    if (!hreflang) {
      hreflang = document.createElement('link')
      hreflang.rel = 'alternate'
      hreflang.hreflang = 'en'
      document.head.appendChild(hreflang)
    }
    hreflang.href = currentUrl

  }, [title, description, keywords, currentUrl, ogTitle, ogDescription, ogImage, ogType, twitterTitle, twitterDescription, noIndex, structuredData])

  return null
}

// SEO data for each page
export const seoData = {
  home: {
    title: 'TVK Canada - Official Thalapathy Vijay Fan Club | Tamil Community',
    description: 'Join TVK Canada, the premier Thalapathy Vijay fan club in Canada. Exclusive events, memberships, movie screenings, and vibrant Tamil community across Toronto, Vancouver, Montreal.',
    keywords: 'TVK Canada, Thalapathy Vijay fan club, Tamil community Canada, Vijay events Toronto, Tamil cinema, TVK membership, Thalapathy fans, Vijay Canada',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TVK Canada",
      "alternateName": ["Tamil Vijay Katchi Canada", "Thalapathy Vijay Fan Club Canada"],
      "description": "Official Thalapathy Vijay fan club serving Tamil community across Canada",
      "url": "https://tvkcanada.family",
      "logo": "https://tvkcanada.family/images/Logo/tvk-logo.png",
      "sameAs": [
        "https://www.facebook.com/TVKCanada",
        "https://www.instagram.com/tvkcanada",
        "https://twitter.com/TVKCanada"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA",
        "addressRegion": "Ontario"
      }
    }
  },
  about: {
    title: 'About TVK Canada - Tamil Vijay Katchi Fan Club | Our Mission & Vision',
    description: 'Discover TVK Canada\'s mission to unite Thalapathy Vijay fans across Canada. Learn about our community activities, cultural programs, and commitment to Tamil heritage.',
    keywords: 'About TVK Canada, Tamil Vijay Katchi mission, Thalapathy Vijay fan club history, Tamil community Canada, Vijay fans Toronto, Tamil cultural organization',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About TVK Canada",
      "description": "Learn about TVK Canada's mission to unite Thalapathy Vijay fans across Canada",
      "mainEntity": {
        "@type": "Organization",
        "name": "TVK Canada",
        "description": "Premier Thalapathy Vijay fan organization in Canada"
      }
    }
  },
  membership: {
    title: 'Join TVK Canada Membership - Exclusive Thalapathy Vijay Fan Benefits',
    description: 'Become a TVK Canada member! Get exclusive access to Vijay movie premieres, fan events, merchandise discounts, and connect with Tamil community nationwide.',
    keywords: 'TVK Canada membership, join Vijay fan club, Thalapathy membership benefits, Tamil fan club Canada, Vijay events access, exclusive Vijay content',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "TVK Canada Membership",
      "description": "Exclusive membership program for Thalapathy Vijay fans in Canada",
      "provider": {
        "@type": "Organization",
        "name": "TVK Canada"
      },
      "offers": {
        "@type": "Offer",
        "description": "Annual and lifetime membership options available"
      }
    }
  },
  events: {
    title: 'TVK Canada Events - Thalapathy Vijay Movie Screenings & Fan Meetups',
    description: 'Join upcoming TVK Canada events! Movie premieres, fan meetups, cultural celebrations, and exclusive Thalapathy Vijay gatherings across Toronto, Vancouver, Montreal.',
    keywords: 'TVK Canada events, Vijay movie screenings, Tamil events Canada, Thalapathy fan meetups, Vijay celebrations, Tamil cinema events Toronto',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      "name": "TVK Canada Events",
      "description": "Regular events and gatherings for Thalapathy Vijay fans",
      "organizer": {
        "@type": "Organization",
        "name": "TVK Canada"
      }
    }
  },
  globalNetwork: {
    title: 'TVK Global Network - Worldwide Thalapathy Vijay Fan Communities',
    description: 'Explore TVK\'s global network connecting Thalapathy Vijay fan clubs worldwide. Join international Tamil communities from India to USA, UK, Australia, and beyond.',
    keywords: 'TVK global network, worldwide Vijay fans, international Tamil community, global Thalapathy supporters, Vijay fan clubs worldwide, Tamil diaspora',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TVK Global Network",
      "description": "Global network of Thalapathy Vijay fan communities worldwide"
    }
  },
  gallery: {
    title: 'TVK Canada Photo Gallery - Vijay Fan Events & Community Memories',
    description: 'Browse TVK Canada\'s exclusive photo gallery featuring Thalapathy Vijay fan events, movie celebrations, community gatherings, and memorable moments.',
    keywords: 'TVK Canada photos, Vijay fan events gallery, Thalapathy event pictures, Tamil community photos, Vijay celebration images, TVK memories',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "TVK Canada Photo Gallery",
      "description": "Collection of photos from TVK Canada events and activities"
    }
  },
  contact: {
    title: 'Contact TVK Canada - Get in Touch with Thalapathy Vijay Fan Club',
    description: 'Contact TVK Canada for membership information, event details, partnerships, or general inquiries. Connect with Canada\'s leading Thalapathy Vijay fan community.',
    keywords: 'Contact TVK Canada, Vijay fan club contact, Thalapathy fan club information, Tamil community contact Canada, TVK support, fan club inquiries',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact TVK Canada",
      "description": "Get in touch with TVK Canada for membership and event information"
    }
  }
}