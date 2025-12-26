import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Railway deployment: standalone output
  output: 'standalone',

  // Image optimization with modern formats
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.teacher.ac.pk',
      },
      {
        protocol: 'https',
        hostname: '*.cloudflare.com',
      },
    ],
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    NEXT_PUBLIC_APP_NAME: 'teacher.ac.pk',
  },

  // Experimental features
  experimental: {
    // Enable React 19 optimizations
    reactCompiler: false,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [];
  },
};

export default nextConfig;

