/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thearak-next-computer.s3.ap-southeast-1.amazonaws.com',
      
      },
      {
        protocol: 'https',
        hostname: 'thearak-next-ecommerce.s3.ap-southeast-1.amazonaws.com',
        pathname: '/uploads/**',
      
      },
    
        {
        protocol: 'https',
        hostname: 'seeklogo.com',
      
      },
        {
        protocol: 'https',
        hostname: 'thearak-next-ecommerce.s3.amazonaws.com',
      
      },
         {
        protocol: 'https',
        hostname: 'https://lh3.googleusercontent.com',
      
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      
      },
       {
        protocol: 'https',
        hostname: 'www.pngmart.com',
      
      },
        {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      
      },

        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      
      },
    ],
  },
}

module.exports = nextConfig