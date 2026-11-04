import Link from "next/link";
import { T } from "@/components/i18n/T";

export default function NotFound() {
  return (
    <div className="wrap section-pad">
      <h1 className="h-display">
        <T id="Halaman tidak ditemukan" en="Page not found" />
      </h1>
      <p className="mt-4 max-w-[34rem]">
        <T
          id="Alamat yang kamu buka tidak ada di situs ini. Kembali ke beranda untuk melihat daftar proyek."
          en="The address you opened does not exist on this site. Head back home to see the projects."
        />
      </p>
      <Link href="/" className="btn-plain mt-6">
        <T id="Ke beranda" en="Go home" />
      </Link>
    </div>
  );
}
