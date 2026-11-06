import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Loopa berganti nama menjadi Eyva: tautan lama yang sudah dibagikan tetap sampai ke halaman yang benar.
  async redirects() {
    return [{ source: "/projects/loopa", destination: "/projects/eyva", permanent: true }];
  },
};

export default nextConfig;
