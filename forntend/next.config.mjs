/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-cms-api.up.railway.app",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
