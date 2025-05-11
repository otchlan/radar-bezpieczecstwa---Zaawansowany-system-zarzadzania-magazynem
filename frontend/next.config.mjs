/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['a.tile.openstreetmap.org', 'b.tile.openstreetmap.org', 'c.tile.openstreetmap.org'],
  },
  // This ensures that GeoJSON files are correctly handled by Next.js
  webpack(config) {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ['json-loader'],
      type: 'javascript/auto'
    });
    return config;
  },
  // This allows you to serve static files from the utils directory
  async rewrites() {
    return [
      {
        source: '/utils/:path*',
        destination: '/api/static/:path*',
      },
    ];
  },
  // Transpile leaflet for next.js compatibility
  transpilePackages: ['leaflet'],
}
export default nextConfig;