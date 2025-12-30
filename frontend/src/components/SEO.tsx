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
    title: 'TVK Canada - More Than Movies. One Family. One Purpose.',
    description: 'Join TVK Canada, a community of Thalapathy fans focused on wellness, mental health, sports, growth, and giving back. Free drop-in programs across Canada.',
    keywords: 'TVK Canada, Thalapathy Vijay fan club, Tamil community Canada, wellness, mental health, sports, drop-in programs, community',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TVK Canada",
      "alternateName": ["Tamil Vijay Katchi Canada", "Thalapathy Vijay Fan Club Canada"],
      "description": "Community of Thalapathy fans focused on wellness, mental health, sports, growth, and giving back",
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
    title: 'About TVK Canada - More Than a Fan Club. A Family.',
    description: 'TVK Canada is a family of like-minded Thalapathy fans who support one another in wellness, growth, and community service. Join our community.',
    keywords: 'About TVK Canada, Tamil community, Thalapathy Vijay fans, wellness, mental health, family, community service',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About TVK Canada",
      "description": "Learn about TVK Canada's mission to unite Thalapathy Vijay fans through wellness, growth, and community service",
      "mainEntity": {
        "@type": "Organization",
        "name": "TVK Canada",
        "description": "Community of Thalapathy fans focused on wellness, mental health, sports, and giving back"
      }
    }
  },
  membership: {
    title: 'Join TVK Canada - Community Membership for Thalapathy Vijay Fans',
    description: 'Join TVK Canada community! Connect with fellow Thalapathy fans, participate in wellness programs, sports drop-ins, movie nights, and community events across Canada.',
    keywords: 'TVK Canada community, join Vijay fan club, Thalapathy community Canada, Tamil fan club Canada, Vijay events, community programs',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "TVK Canada Community",
      "description": "Community membership for Thalapathy Vijay fans in Canada focused on wellness, sports, and growth",
      "provider": {
        "@type": "Organization",
        "name": "TVK Canada"
      },
      "offers": {
        "@type": "Offer",
        "description": "Free community membership with optional program fees"
      }
    }
  },
  events: {
    title: 'Programs & Events - Drop-In Sports, Wellness & Movie Nights | TVK Canada',
    description: 'Join TVK Canada programs: mental health drop-ins, basketball, indoor sports, and movie watch parties. Free and affordable activities for the whole family.',
    keywords: 'TVK Canada events, drop-in sports, mental health support, basketball, movie screenings, Tamil events Canada, community programs',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      "name": "TVK Canada Programs & Events",
      "description": "Drop-in sports, wellness programs, and community events for Thalapathy Vijay fans",
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
    title: 'TVK Canada Photo Gallery - Community Events & Memories',
    description: 'Browse TVK Canada\'s photo gallery featuring community events, sports activities, movie celebrations, and memorable moments.',
    keywords: 'TVK Canada photos, community events gallery, sports activities, movie celebrations, Tamil community photos',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "TVK Canada Photo Gallery",
      "description": "Collection of photos from TVK Canada events and activities"
    }
  },
  contact: {
    title: 'Contact TVK Canada - Get in Touch | Request a Program',
    description: 'Contact TVK Canada for program information, event details, or to suggest a new activity. Connect with Canada\'s leading Thalapathy Vijay fan community.',
    keywords: 'Contact TVK Canada, request program, suggest activity, community contact, fan club inquiries',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact TVK Canada",
      "description": "Get in touch with TVK Canada for program and event information"
    }
  }
}