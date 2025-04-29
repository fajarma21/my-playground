import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pokemon.com",
        port: "",
        pathname: "/static-assets/content-assets/cms2/img/pokedex/detail/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname:
          "/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/**",
        search: "",
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
