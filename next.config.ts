import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Tautan lama yang sudah dibagikan tetap sampai ke halaman yang benar.
  async redirects() {
    return [{ source: "/projects/loopa", destination: "/projects/eyva", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/cv/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
      {
        source: "/cv",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
          {
            key: "Content-Type",
            value: "text/html; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
