import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup bindings for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing config
};

export default nextConfig;