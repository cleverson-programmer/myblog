/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https', // Permite apenas imagens de HTTPS
          hostname: '**', // Aceita qualquer hostname
        },
      ],
    },
};
  
module.exports = nextConfig;
  
