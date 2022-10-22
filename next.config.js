/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript:{
    ignoreBuildErrors:true
  },
  
  swcMinify: true,
  images: {
    domains: [
      'fadeawayworld.net', 
      'lh3.googleusercontent.com',
    ]
  }
}

module.exports = nextConfig
