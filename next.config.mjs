/** @type {import('next').NextConfig} */
const nextConfig = {};

import withPWA from "next-pwa"
const PWA = withPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
export default PWA(nextConfig);