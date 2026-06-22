/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/articles/canva-sales-tax",
        destination: "/articles/canva-tax",
        statusCode: 301
      },
      {
        source: "/articles/chatgpt-side-job-tax",
        destination: "/articles/chatgpt-tax",
        statusCode: 301
      }
    ];
  }
};

export default nextConfig;
