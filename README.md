# Radja Admiral — Personal Portfolio

Repositori ini berisi kode sumber untuk situs portofolio personal **Radja Admiral**, mahasiswa D4 Teknologi Rekayasa Perangkat Lunak (Software Engineering Technology) di IPB University.

- **Repository:** https://github.com/Admrlrdj/portfolio
- **Dokumen Desain:** [`DESIGN.md`](./DESIGN.md)

---

## 📌 About Repo

Situs portofolio ini dirancang sebagai ruang pamer interaktif untuk menampilkan proyek sistem utuh (web, REST API, serta model *machine learning*), pengalaman organisasi & kepanitiaan, keahlian teknis, dan Curriculum Vitae (CV) ramah ATS.

Dibangun dengan pendekatan editorial yang tenang, spesifik, dan mudah dibaca di perangkat seluler maupun desktop, situs ini menggabungkan performa komponen server **Next.js App Router** dengan interaksi visual seperti diorama ruang kerja 3D isometrik (**Kamar Radja**).

---

## ✨ Key Features

- **Diorama "Kamar Radja" (3D & SVG Fallback):** Navigasi ruang kerja interaktif berbasis **Spline 3D** dengan *fallback* ilustrasi SVG isometrik otomatis jika perangkat hemat data, tanpa WebGL, atau mengaktifkan `prefers-reduced-motion`.
- **Dwibahasa Tanpa Hidrasi Ulang (ID / EN):** Saklar bahasa Indonesia dan Inggris instan berbasis atribut `html[data-lang]` dan komponen `<T>` / `<TV>` yang ramah *Server Components*.
- **Tema Terang & Gelap (View Transitions):** Palet warna kertas dan tinta berstandar kontras aksesibilitas WCAG AA dengan animasi perpindahan melingkar (*View Transitions API*).
- **Studi Kasus Proyek Mendalam:** Setiap proyek unggulan dilengkapi rincian masalah, peran, keputusan teknis, hasil terukur, keterbatasan yang belum selesai, serta pratinjau tangkapan layar desktop & ponsel.
- **Generator CV ATS Otomatis:** Mengonversi berkas Markdown CV berbahasa Indonesia dan Inggris menjadi halaman web responsif serta berkas PDF siap unduh menggunakan *headless Chrome*.
- **Interaksi Mikro & Aksesibilitas:** Mendukung *smooth scrolling* (Lenis), avatar 3D berbasis CSS, linimasa pengalaman bergaya jalur KRL, serta penghormatan penuh terhadap pengaturan `prefers-reduced-motion`.

---

## 🛠 Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack / RSC) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`) & CSS Variables |
| **3D & Motion** | [Spline](https://spline.design/) (`@splinetool/react-spline`), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll), CSS 3D Transforms |
| **Icons & Assets** | Custom Isometric SVG, [Simple Icons](https://simpleicons.org/) |
| **Content & Utilities** | [Marked](https://marked.js.org/) (Markdown parser untuk CV), Headless Chrome PDF Builder |
| **Code Quality** | ESLint 9 (`eslint-config-next`), TypeScript Compiler (`tsc`) |

---

## 🔗 Endpoints & Routes

Meskipun menggunakan arsitektur aplikasi web Next.js App Router, situs ini menyediakan sejumlah rute halaman, *anchor section*, serta *endpoint* metadata dan aset statis berikut:

### 1. Halaman Utama & Navigasi Bagian (`/#section`)
| Route / Endpoint | Deskripsi |
| :--- | :--- |
| `/` | Halaman utama portofolio (Hero, Kamar Radja, Proyek, Pengalaman, Keahlian, Pendidikan, Kontak). |
| `/#kamar` | Bagian diorama interaktif **Kamar Radja** (menu visual 5 objek menuju tiap bagian situs). |
| `/#proyek` | Slider daftar proyek pilihan beserta pratinjau interaktif. |
| `/#pengalaman` | Linimasa pengalaman kepanitiaan, organisasi, dan kerja tim. |
| `/#keahlian` | Daftar teknologi dan kakas yang dikuasai per kategori. |
| `/#pendidikan` | Riwayat pendidikan dan pencapaian akademik. |
| `/#kontak` | Bagian kontak interaktif bergaya kode (`kontak.ts`) beserta terminal simulasi. |

### 2. Rute Halaman Dinamis & Dokumen
| Route / Endpoint | Deskripsi |
| :--- | :--- |
| `/cv` | Halaman Curriculum Vitae ramah ATS (dwibahasa ID/EN) dengan tombol unduh PDF dan tautan Google Drive. |
| `/projects/[slug]` | Halaman detail studi kasus dan dokumentasi untuk masing-masing proyek. |
| `/projects/eyva` | Studi kasus **Eyva: Smart Study Companion** (Next.js, FastAPI, YOLO11, Supabase). |
| `/projects/siagars` | Studi kasus **SiagaRS** (Next.js, Go, MongoDB, OpenAPI). |
| `/projects/eduportal-sibermu` | Detail proyek **EduPortal SiberMu** (Next.js, GSAP, Lenis). |
| `/projects/lms-hyper-optimum` | Detail proyek **LMS Hyper Optimum** (WordPress, WPLMS, myCred, SCORM). |
| `/projects/save-raja-ampat` | Detail proyek **Save Raja Ampat** (Next.js, Framer Motion, Leaflet, Recharts). |
| `/projects/warkop-setia-abadi` | Detail proyek **Warkop Setia Abadi** (HTML5, CSS3, JavaScript, Slick). |

### 3. Metadata, SEO & Aset Publik
| Route / Endpoint | Deskripsi |
| :--- | :--- |
| `/opengraph-image` | Endpoint dinamis (`next/og`) yang menghasilkan gambar OpenGraph (1200×630 PNG). |
| `/sitemap.xml` | Peta situs XML otomatis yang mencakup halaman utama, `/cv`, dan seluruh rute `/projects/[slug]`. |
| `/robots.txt` | Konfigurasi perayap mesin pencari (*web crawler*). |
| `/cv/CV_Radja_Admiral_ATS_ID.pdf` | Berkas PDF CV versi Bahasa Indonesia. |
| `/cv/CV_Radja_Admiral_ATS_EN.pdf` | Berkas PDF CV versi Bahasa Inggris. |

---

## ⚙️ Environment Variables

Salin berkas `.env.example` menjadi `.env.local` dan sesuaikan nilainya:

```bash
cp .env.example .env.local
```

| Variabel | Wajib | Deskripsi |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_SITE_URL` | Tidak | URL publik situs untuk kebutuhan kanonikal SEO, `sitemap.xml`, dan `robots.txt` (contoh: `https://radjaadmiral.vercel.app`). |
| `NEXT_PUBLIC_SPLINE_SCENE_URL` | Tidak | URL publik `.splinecode` dari Spline. Jika dikosongkan, situs otomatis menampilkan ilustrasi ruang kerja versi SVG. |
| `NEXT_PUBLIC_CV_DRIVE_URL` | Tidak | Tautan Google Drive CV. Jika dikosongkan, tombol *"Buka di Google Drive"* pada halaman `/cv` akan disembunyikan. |

---

## 🚀 How to Install & Run

### Prasyarat
- **Node.js** versi `20.x` atau lebih baru
- **npm** (bawaan Node.js)
- **Google Chrome** *(opsional, hanya diperlukan jika ingin menjalankan skrip generator PDF CV `npm run build:cv`)*

### 1. Clone Repositori
```bash
git clone https://github.com/Admrlrdj/portfolio.git
cd portfolio
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment
Buat berkas `.env.local` dari `.env.example`:
```bash
cp .env.example .env.local
```

### 4. Jalankan Server Pengembangan (Development)
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di peramban untuk melihat hasilnya.

### 5. Build & Jalankan untuk Produksi (Production)
```bash
npm run build
npm run start
```

### Perintah Tambahan (Scripts)
| Perintah | Kegunaan |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan Next.js. |
| `npm run build` | Membangun aplikasi untuk produksi (`.next`). |
| `npm run start` | Menjalankan hasil *build* produksi. |
| `npm run lint` | Memeriksa kualitas kode menggunakan ESLint. |
| `npm run typecheck` | Memeriksa tipe statis TypeScript (`tsc --noEmit`). |
| `npm run build:cv` | Mengonversi berkas Markdown di `content/cv/` menjadi PDF di `public/cv/` menggunakan Chrome *headless*. |

---

## 📂 Project Structure

```text
portfolio/
├── app/                  # Next.js App Router (halaman, layout, SEO, rute dinamis)
│   ├── cv/               # Halaman Curriculum Vitae (/cv)
│   ├── projects/[slug]/  # Halaman studi kasus tiap proyek (/projects/[slug])
│   ├── globals.css       # Variabel tema, utilitas styling, dan animasi CSS
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/           # Komponen UI, efek interaktif, dan bagian halaman
│   ├── fx/               # Efek visual (Avatar3D, SmoothScroll, Intro, Tilt, dll.)
│   ├── i18n/             # Komponen & hook dwibahasa (T, TV, useLang)
│   ├── scene/            # Diorama Kamar Radja (Spline, SVG fallback, ikon isometrik)
│   ├── sections/         # Bagian utama halaman (Hero, Experience, Skills, Contact, dll.)
│   ├── site/             # Header dock, Footer, ThemeToggle, LangToggle
│   └── ui/               # Komponen antarmuka dasar (ProjectCover, TechIcon, Reveal, dll.)
├── content/              # Sumber data terstruktur (proyek, profil, pengalaman, keahlian, CV)
│   └── cv/               # Sumber Markdown CV (ID & EN)
├── docs/                 # Dokumentasi internal (panduan CV & pembuatan scene Spline)
├── lib/                  # Fungsi pembantu (i18n, SEO JSON-LD, parser CV, scroll)
├── public/               # Aset statis (tangkapan layar proyek .webp, PDF CV)
├── scripts/              # Skrip otomasi (build-cv.mjs untuk cetak PDF)
└── DESIGN.md             # Catatan keputusan desain, tipografi, warna, dan perilaku 3D
```

---

## 📬 Contact

**Radja Admiral**
- **Email:** [radjaadmiral00@gmail.com](mailto:radjaadmiral00@gmail.com)
- **GitHub:** [@Admrlrdj](https://github.com/Admrlrdj)
- **LinkedIn:** [linkedin.com/in/admieral](https://www.linkedin.com/in/admieral/)
- **Instagram:** [@rdjadmrl](https://www.instagram.com/rdjadmrl/)
