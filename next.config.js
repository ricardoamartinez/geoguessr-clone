/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Removed the experimental serverComponentsExternalPackages
    env: {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      NEXT_PUBLIC_SOCKET_IO_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL, // Ensure this is set if used
    },
  };
  
  module.exports = nextConfig;
  