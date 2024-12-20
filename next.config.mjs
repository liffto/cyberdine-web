/** @type {import('next').NextConfig} */
const nextConfig = {
  //  (https://firebasestorage.googl
  images: {
    minimumCacheTTL: 180,
    domains: ['raw.githubusercontent.com', 'firebasestorage.googleapis.com', 'googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.firebasestorage.googleapis.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.raw.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
        port: '',
      },
    ],
  },

};

import withPWA from "next-pwa"
const PWA = withPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
export default PWA(nextConfig);