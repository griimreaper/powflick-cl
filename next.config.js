/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }],
    domains: [
      "5ogdqbzzrogmotoh.public.blob.vercel-storage.com",
      "ideasjersey.com",
      "help.pitpay.com",
      "emmanuela.insyst.info",
    ],
  },
};

module.exports = nextConfig;
