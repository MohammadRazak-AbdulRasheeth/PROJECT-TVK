/**
 * Image assets for TVK Canada website
 */

export const images = {
  logo: '/src/images/Logo/Logo.heic',

  gallery: {
    // TVK and Vijay related images for gallery and content
    img1: '/src/images/TVK vijay/16170924.jpg',
    img2: '/src/images/TVK vijay/174a839f96ba63615479238925c9a730.jpg',
    img3: '/src/images/TVK vijay/1bca1b131799bb057ec110e3d4346891.jpg',
    img4: '/src/images/TVK vijay/29d4061b2faf9bd4bc4205edb1807281.jpg',
    img5: '/src/images/TVK vijay/2i28dhvk_actor-vijay-ani_160x120_28_October_24.jpg',
    img6: '/src/images/TVK vijay/43a1f00ad03fcdad3595a21c18a44338.jpg',
    img7: '/src/images/TVK vijay/537f25e23bdf4bae5cf583f08a53c1a5.jpg',
    img8: '/src/images/TVK vijay/58e5078007b5c8d192b763b18c16b2df.jpg',
    img9: '/src/images/TVK vijay/643b34b2e60f0118d419c7a2c2d78562.jpg',
    img10: '/src/images/TVK vijay/6a4a90cc00ff6d9f0d4f2e3a35b68bc9.jpg',
    img11: '/src/images/TVK vijay/aa902d03f8a0f84178be2d9539f0e535.jpg',
    img12: '/src/images/TVK vijay/ae07e76c153ae10ef0c52a3ff8e28d10.jpg',
    img13: '/src/images/TVK vijay/b3c0c0bea3b97ccccb88b47a7a8c9e80.jpg',
    img14: '/src/images/TVK vijay/c82141f8075a41ad71c14cead59754f1.jpg',
    img15: '/src/images/TVK vijay/download (1).png',
    img16: '/src/images/TVK vijay/download (2).png',
    img17: '/src/images/TVK vijay/download.png',
    img18: '/src/images/TVK vijay/eef171e7fc1b3a5982530bf6e42deb52.jpg',
    img19: '/src/images/TVK vijay/f0ed1d7c9adeba021541af511d662584.jpg',
    img20: '/src/images/TVK vijay/fa137d5b4fcc57e084a8d002c497a7d9.jpg',
    img21: '/src/images/TVK vijay/vijay-tvk-party-conference-pti.jpg',
    img22: '/src/images/TVK vijay/WhatsApp-Image-2024-02-02-at-4.27.14-PM-960x653.jpeg',
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
