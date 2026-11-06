# DESIGN.md — Portfolio Radja Admiral

## Design Read

| Pertanyaan | Jawaban |
|---|---|
| Produk | Portfolio personal mahasiswa D4 Software Engineering Technology IPB, mencari magang full-stack/backend Semester 6 (2027) |
| Pembaca | Recruiter dan engineering manager dari LinkedIn/CV, sering lewat HP |
| Yang harus diingat | Radja membangun sistem utuh (web, API, model ML) dan bisa memimpin tim |
| Nada | Tenang, spesifik, teknis tapi mudah dibaca |
| Dial | VARIANCE 4 · MOTION 4 · DENSITY 3. Dinaikkan atas permintaan pemilik agar situs lebih hidup; gerak tetap berfungsi dan dimatikan oleh reduced-motion |
| Peran 3D | "Ruang Kerja": diorama isometrik yang menjadi menu situs; lima benda membuka lima section. Selalu ada tombol teks di bawahnya |

## Bahasa

Indonesia sebagai bawaan, saklar ID/EN di ujung kanan dock (tersimpan di `localStorage` "lang", dipasang sebelum cat pertama lewat `langScript`). Teks konten bertipe `Bi` (`lib/i18n.ts`) dan dirender dua-duanya lewat `<T>`/`<TV>`; CSS menyembunyikan yang tidak aktif berdasarkan `html[data-lang]`, jadi komponen server tetap bisa dipakai dan tidak ada beda hidrasi. Teks yang tidak bisa dirender ganda (aria-label, tooltip, teks yang diketik di `kontak.ts`, format tanggal) memakai `useLang()`. Metadata halaman dan file CV tetap berbahasa Indonesia. Di HP, ikon CV disembunyikan dari dock agar saklar muat.

## Tema

Terang sebagai bawaan, toggle terang/gelap berfungsi dan tersimpan di `localStorage`. Alasan: isi situs adalah teks yang dibaca (studi kasus), bukan alat kreatif.

## Palet (CSS variables di `app/globals.css`)

| Token | Terang | Gelap |
|---|---|---|
| paper | `#F4F1EA` | `#0E1116` |
| ink | `#0E1116` | `#ECE8DF` |
| accent | `#C23E1A` | `#FF7A55` |

Penyimpangan dari usulan spec: aksen terang `#E5532D` hanya 3,4:1 di atas kertas, di bawah syarat 4,5:1 untuk teks. Diganti `#C23E1A` (sekitar 4,6:1). Tetap satu aksen. Dipakai pada tombol utama (Lihat CV, email), hover/fokus tautan dan chip, objek 3D yang sedang dipilih, garis bawah nama di hero, dan satu sorotan di tiap sampul proyek.

## Ikon dan ilustrasi

- Ikon bagian (monitor, kalender, rak buku, bingkai, ponsel, kertas CV) adalah benda isometrik buatan sendiri dari helper `components/scene/iso.tsx`, sama dengan bahasa visual ruang kerja. Alasannya: satu identitas yang berasal dari cerita situs, bukan set ikon bawaan yang tampak sama di semua situs.
- Logo teknologi memakai paket `simple-icons` karena logo merek adalah ikon yang relevan (React, Next.js, Python, dan seterusnya). Satu warna (`currentColor`), tanpa warna merek, supaya palet tetap satu aksen. Teknologi tanpa ikon tampil sebagai teks.
- Setiap proyek punya sampul SVG buatan sendiri yang menggambarkan konsepnya (deteksi mata tertutup di Eyva, dulu Loopa, pin rumah sakit dan kartu bandingkan di SiagaRS, pembanding before/after di Save Raja Ampat, empat tingkat hierarki di LMS, carousel di EduPortal, gelas kopi di Warkop). Tanpa angka karangan; teks di dalam sampul hanya nama kelas atau istilah yang memang ada di proyeknya.

## Gerak (MOTION 3)

- Muncul saat di-scroll (`Reveal`), sekali per elemen; konten tetap terlihat tanpa JS dan di reduced-motion tanpa geser.
- Garis di sampul dan garis bawah hero tergambar sekali. Sampul bergeser sedikit dan uap kopi naik hanya saat hover.
- Benda di ruangan terangkat saat disorot. Tombol `T` mengganti tema.
- Scroll halus dengan Lenis (`components/fx/SmoothScroll.tsx`); tautan bagian dan klik objek 3D memakai scroll yang sama. Mati di reduced-motion.
- Scrollbar bawaan disembunyikan dan diganti garis progres di sisi kanan (`SideProgress`): garis terisi sesuai posisi, satu titik per bagian yang bisa diklik, penanda bagian aktif di header.
- Tiap bagian setinggi layar penuh (`.page`) dalam satu halaman, bisa dituju lewat `/#kamar`, `/#proyek`, dan seterusnya. Halaman `/cv` dan `/projects/[slug]` adalah rute terpisah.
- Kursor bulat dihapus atas permintaan pemilik. Saat hover, kartu menampilkan lingkaran berlabel di tengahnya (`data-hint`) dengan ripple terisi, bukan outline.
- Tombol memakai `.btn-live`: lapisan warna menyapu dari kiri, bayangan bergeser, ikon melompat sekali.
- Navbar adalah dock melayang (`Header`) berisi ikon benda-benda Kamar Radja saja (kamar, monitor, kalender, rak buku, bingkai, ponsel), ditambah CV dan tema. Ikon yang dekat kursor membesar, gelembung aksen meluncur ke bagian aktif, label muncul saat hover. Tautan bagian menggulung tepat ke tepi atas layar (offset 0), dan pembatas `.page::after` ditaruh 1rem di atas tepi bawah agar garis bagian sebelumnya tidak terlihat.
- Intro puzzle (`Intro`, tampil setiap kali halaman utama dimuat ulang, dilewati bila reduced-motion): 12 potongan jigsaw huruf nama terbang dan menyatu, lalu "whoop" (gelombang loncat, warna aksen, konfeti, gelembung), tirai terangkat. Tombol Lewati, Esc, dan Enter menutupnya. Animasi hero ditahan sampai intro selesai.
- Ganti tema memakai View Transitions: lingkaran melebar dari tombol (`ThemeToggle`); tanpa dukungan atau reduced-motion, berganti langsung.
- Kursor kustom hanya untuk mouse (`cursor` dengan SVG, variasi terang dan gelap), berbentuk belah ketupat isometrik, bukan panah: titik tinta untuk biasa, bingkai aksen untuk tautan, garis putus untuk seret.
- Serpihan (`Shards`): kubus isometrik 12 segitiga di pojok kanan atas tiap bagian, menyatu saat bagian tepat di layar dan berhamburan saat digulir ke atas atau ke bawah (dihitung dari posisi scroll).
- Teks yang diblok memakai warna aksen.
- Footer terbalik warna: nama besar bergelombang mengikuti kursor, jam WIB Bogor, lama di situs, tumpukan teknologi, tautan, tombol kembali ke atas dengan persen scroll.
- Kamar Radja: tombol samping menyala (isi aksen, ikon bergoyang) saat benda di scene disorot; tahan di scene memunculkan cincin pengisi dan scene mendekat, lepas di atas benda membuka bagiannya (ketukan singkat juga, tetapi tidak setelah menyeret). Selama kursor di atas benda, roda mouse tidak menggulung halaman. Ada sorot cahaya mengikuti kursor dan debu halus. Scene Spline sendiri tidak diubah.
- Kartu proyek: kursor di atas kartu mengganti sampul dengan tangkapan halaman utama situsnya yang bergulir pelan (`public/docs/<slug>/preview.webp`). Proyek tanpa tangkapan (LMS Hyper Optimum) menampilkan robot 404 yang matanya mengikuti kursor (`RobotError`).
- Halaman proyek punya bagian Dokumentasi: tangkapan layar situs yang berjalan (desktop dan ponsel), diambil dengan Chrome headless lewat DevTools Protocol. Eyva hanya menampilkan halaman publik (pembuka, dokumentasi API, kebijakan privasi, login) karena dashboard-nya mewajibkan login.
- Keahlian: satu baris per kategori, masing-masing berjalan sendiri (arah bergantian), berhenti saat di-hover.
- Kontak: editor `kontak.ts` hanya-baca yang mengetik sendiri, kursor pindah dengan klik atau panah, petunjuk saat hover, tombol Jalankan membuka terminal kecil.
- Hero memakai model 3D karakter buatan sendiri dengan CSS 3D (`Avatar3D`), bukan foto dan bukan Three.js: kepala mengikuti mouse, badan bisa diputar dengan menyeret. Ini karakter blok bergaya, bukan pindai wajah.
- Proyek memakai slider horizontal (`HSlider`) dengan panah, seret mouse, dan penghitung, terurut dari yang paling baru selesai. Pengalaman memakai timeline jalur KRL yang kereta dan stasiunnya mengikuti scroll.
- Hanya perangkat dengan mouse: tombol magnetik dengan tarikan maksimal 6 px, kartu miring maksimal 5 derajat, ruangan miring mengikuti mouse, parallax tiga lapis di hero.
- Nama di hero muncul huruf demi huruf sekali dan tiap huruf terangkat saat di-hover; stiker teknologi bisa diseret.
- Transisi masuk halaman lewat `app/template.tsx`.
- Gerak yang berjalan terus: baris keahlian, debu halus di Kamar Radja, kursor teks di editor kontak. Semua gerak dimatikan oleh `prefers-reduced-motion`.
- Klik pada objek scene Spline hanya menggulung halaman bila didahului sentuhan nyata pada scene (pengaman terhadap event yang ditembakkan scene sendiri).

## Tipografi

- Judul: Instrument Serif (editorial)
- Isi: Public Sans 400/600
- Mono (stack, tanggal): IBM Plex Mono 400
- Skala fluid dengan `clamp()`.

## Bentuk

Radius 4 px (tombol) dan 8 px (kartu). Bayangan hanya untuk menu mobile. Selebihnya datar.

## Breakpoint (dari konten)

- < 640 px: satu kolom; ruangan memenuhi lebar, tombol bagian membungkus
- 640–767 px: daftar tetap satu kolom, ruangan dibatasi 34rem
- 768 px ke atas: hero dua kolom, proyek unggulan dua kolom, baris proyek tiga kolom, navigasi inline

## Aturan 3D

- Jalur: ruangan SVG (gambar) adalah tampilan bawaan dan fallback; scene Spline menggantikannya hanya jika `NEXT_PUBLIC_SPLINE_SCENE_URL` diisi dan perangkat mendukung.
- Spline dimuat malas saat area mendekati viewport; `renderOnDemand`; tidak dimuat untuk reduced-motion, mode hemat data, perangkat berdaya rendah, atau tanpa WebGL.
- `touch-action: pan-y` pada canvas; tidak ada navigasi yang dipicu scroll.
- Adegan `aria-hidden`; tombol teks di bawah ruangan adalah versi aksesibel dan padanan tap.
- Siang/malam di scene **belum mengikuti toggle tema**. Scene yang diekspor tidak punya variabel `theme` (paket gratis Spline), jadi `setVariables` tidak melempar galat tetapi juga tidak berefek. Latar scene transparan, sehingga warna kotak situs tampil di belakangnya dan berganti dengan tema; warna benda di dalam scene tetap satu tampilan.
- Paket gratis Spline menampilkan label "Built with Spline" di pojok kanan bawah scene dan tidak bisa dimatikan tanpa paket berbayar. Label berada di dalam kotak scene, di atas area lantai kosong, dan tidak menutup objek yang bisa diklik atau tombol di bawahnya.
- Ukuran terukur (build produksi, Chrome, 3 Nov 2026): file `scene.splinecode` 26.525 byte mentah (sekitar 17,9 KB terkompresi menurut pengukuran sesi pembuat scene). Chunk JavaScript yang diunduh setelah scene mulai dimuat sekitar 490 KB terkompresi (sekitar 1,8 MB setelah dibuka), batas atas karena bisa mencakup prefetch rute lain; sebelum itu halaman memuat sekitar 440 KB terkompresi. Itu belum diukur di tab Network pada koneksi terbatas.
- Perilaku terverifikasi lewat build Next: hover pada monitor menyorot tombol "Proyek" dan klik menggulung ke `#proyek`. Hotspot lain belum diuji satu per satu di situs; sesi pembuat scene menguji kelimanya di halaman terpisah dengan runtime resmi.
- Panduan membuat scene: `docs/SPLINE_LANGKAH.md` (langkah) dan `docs/SPLINE_SCENE.md` (nama objek).
