/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Սա է պակասում
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;