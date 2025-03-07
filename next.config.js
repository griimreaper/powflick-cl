/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "ui-lib.com" },
      { protocol: "https", hostname: "5ogdqbzzrogmotoh.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "ideasjersey.com" },
      { protocol: "https", hostname: "help.pitpay.com" },
      { protocol: "https", hostname: "emmanuela.insyst.info" },
      { protocol: "https", hostname: "sbvajd9r07chtxp5.public.blob.vercel-storage.com" },
    ],
  },
};

module.exports = nextConfig;
