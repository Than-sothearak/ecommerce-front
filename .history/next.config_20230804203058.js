/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    displayName: false,
     styledComponents: true,
  },
   
    
}

module.exports = nextConfig