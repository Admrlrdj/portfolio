# Membuat scene Spline "Ruang Kerja"

Situs sudah menampilkan ruangan versi gambar (SVG). Scene Spline menggantikannya setelah kamu membuat dan mengisi URL-nya. Scene dibuat di akun Spline-mu sendiri; kode di repo ini belum pernah diuji dengan scene nyata.

## Nama objek (harus persis)

Beri nama objek yang bisa diklik di editor Spline seperti ini. Nama dibaca oleh `components/scene/hotspots.ts`.

| Nama objek di Spline | Benda | Membuka |
|---|---|---|
| `hotspot-proyek` | Monitor di meja | `#proyek` |
| `hotspot-pengalaman` | Kalender di dinding | `#pengalaman` |
| `hotspot-keahlian` | Rak buku | `#keahlian` |
| `hotspot-pendidikan` | Bingkai sertifikat | `#pendidikan` |
| `hotspot-kontak` | Ponsel di meja | `#kontak` |

Jika sebuah benda terdiri dari beberapa bagian, kelompokkan (group) dan beri nama pada group-nya.

## Event

Pada tiap objek `hotspot-*`, aktifkan event **Mouse Hover** dan **Mouse Down** (tanpa aksi bawaan). Kode situs yang menangani keduanya: hover menyorot tombol yang sesuai, klik menggulung ke section.

## Siang/malam mengikuti tema (opsional) — belum dibuat

Status: **belum dibuat**. Scene yang diekspor saat ini tidak punya variabel `theme` (variabel Spline tidak tersedia di paket gratis), jadi siang/malam di scene tidak mengikuti toggle tema. Kode situs tetap memanggil `setVariables`, yang tidak melempar galat tetapi tidak berefek.

Jika kelak tersedia: buat variabel bertipe string bernama `theme` dengan nilai `day` dan `night`, lalu hubungkan ke pencahayaan dan warna langit. Situs mengubah nilainya saat toggle tema ditekan.

## Label Spline

Paket gratis menampilkan label "Built with Spline" di pojok kanan bawah scene. Menghilangkannya membutuhkan paket berbayar.

## Palet

Ambil warna dari palet situs (`app/globals.css`): kertas, tinta, satu aksen. Aksen hanya untuk benda yang sedang disorot. Tanpa partikel, bloom, atau glow.

## Ekspor dan pemasangan

1. Di Spline: Export, lalu Code, pilih Next.js, dan salin URL scene publik (`.splinecode`).
2. Isi `NEXT_PUBLIC_SPLINE_SCENE_URL` di `.env.local` dan di pengaturan environment Vercel. Redeploy setelah mengubahnya, karena nilainya tertanam saat build.
3. Jalankan `npm run dev`, buka situs, dan cek di jaringan browser berapa KB scene yang diunduh. Catat angkanya di `DESIGN.md` sebagai anggaran ukuran.

## Periksa sebelum rilis

- [ ] Kelima hotspot menyorot tombolnya dan menggulung ke section yang benar
- [ ] Geser vertikal di HP tetap menggulung halaman, tidak terkunci di canvas
- [ ] Dengan WebGL dimatikan atau reduced-motion aktif, situs menampilkan ruangan gambar dan catatan alasannya
- [ ] Ukuran unduhan scene sudah diukur dan dicatat
