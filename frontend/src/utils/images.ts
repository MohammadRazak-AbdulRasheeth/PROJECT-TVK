/**
 * Image assets for TVK Canada website
 */

export const images = {
  logo: '/logo.svg',
  logoFallback: '/logo-large.svg',

  gallery: {
    // Root gallery images
    img1: '/gallery-1.jpg',
    img2: '/gallery-2.jpg',
    // TVK Vijay gallery images - properly renamed
    img3: '/images/TVK vijay/tvk-01.jpg',
    img4: '/images/TVK vijay/tvk-02.jpg',
    img5: '/images/TVK vijay/tvk-03.jpg',
    img6: '/images/TVK vijay/tvk-04.jpg',
    img7: '/images/TVK vijay/tvk-05.jpg',
    img8: '/images/TVK vijay/tvk-06.jpg',
    img9: '/images/TVK vijay/tvk-07.jpg',
    img10: '/images/TVK vijay/tvk-08.jpg',
    img11: '/images/TVK vijay/tvk-09.jpg',
    img12: '/images/TVK vijay/tvk-10.jpg',
    img13: '/images/TVK vijay/tvk-11.jpg',
    img14: '/images/TVK vijay/tvk-12.jpg',
    img15: '/images/TVK vijay/tvk-13.jpg',
    img16: '/images/TVK vijay/tvk-14.jpg',
    img17: '/images/TVK vijay/tvk-15.png',
    img18: '/images/TVK vijay/tvk-16.png',
    img19: '/images/TVK vijay/tvk-17.png',
    img20: '/images/TVK vijay/tvk-18.jpg',
    img21: '/images/TVK vijay/tvk-19.jpg',
    img22: '/images/TVK vijay/tvk-20.jpg',
    img23: '/images/TVK vijay/tvk-21.jpg',
    img24: '/images/TVK vijay/tvk-22.jpg',
  },
}

/**
 * Get a random gallery image
 */
export const getRandomGalleryImage = () => {
  const galleryImages = Object.values(images.gallery)
  return galleryImages[Math.floor(Math.random() * galleryImages.length)]
}

/**
 * Get gallery images array
 */
export const getGalleryImages = () => {
  return Object.values(images.gallery)
}
