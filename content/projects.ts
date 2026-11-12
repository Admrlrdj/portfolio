import { bi, type Bi } from "@/lib/i18n";

export type CaseStudy = {
  problem: Bi;
  role: Bi;
  decisions: { title: Bi; body: Bi }[];
  results: Bi[];
  unfinished: Bi[];
};

export type Project = {
  slug: string;
  title: string;
  period: Bi;
  role: Bi;
  summary: Bi;
  stack: string[];
  highlights: Bi[];
  links: { label: Bi; href: string }[];
  featured: boolean;
  /** Gambar tumpukan halaman utama untuk pratinjau saat kursor di atas kartu. */
  preview?: string;
  /** Tangkapan layar situs (public/docs/<slug>/). */
  docs?: { src: string; caption: Bi; mobile?: boolean }[];
  caseStudy?: CaseStudy;
};

const demo = bi("Demo", "Demo");
const repo = bi("Repo", "Repo");
const phone = bi("Tampilan di ponsel", "Mobile view");

export const projects: Project[] = [
  {
    slug: "eyva",
    preview: "/docs/eyva/preview.webp",
    docs: [
      { src: "/docs/eyva/1.webp", caption: bi("Halaman pembuka: login dengan Google atau email", "Landing page: sign in with Google or email") },
      { src: "/docs/eyva/2.webp", caption: bi("Dokumentasi API backend (Swagger): autentikasi, reset password, dan profil", "Backend API docs (Swagger): authentication, password reset, and profile") },
      { src: "/docs/eyva/3.webp", caption: bi("Kebijakan privasi: data apa yang diproses dan untuk apa", "Privacy policy: what data is processed and why") },
      { src: "/docs/eyva/mobile.webp", caption: phone, mobile: true },
    ],
    title: "Eyva: Smart Study Companion",
    period: bi("Okt – Des 2026", "Oct – Dec 2026"),
    role: bi("Back-end developer", "Back-end developer"),
    summary: bi(
      "Aplikasi belajar dengan timer Pomodoro yang memakai webcam untuk mendeteksi tanda kantuk dan menyarankan jeda.",
      "A Pomodoro study app that uses the webcam to detect signs of drowsiness and suggest breaks.",
    ),
    stack: ["Next.js", "FastAPI", "Python", "YOLO11", "Supabase", "Railway"],
    highlights: [
      bi(
        "YOLO11n di-fine-tune pada 3.841 gambar, 6 kelas: mAP50 0,959 pada 195 gambar uji statis (validasi webcam masih berjalan), sekitar 52 ms per frame di CPU.",
        "Fine-tuned YOLO11n on 3,841 images across 6 classes: mAP50 0.959 on 195 static test images (live webcam validation still in progress), about 52 ms per frame on CPU.",
      ),
      bi(
        "Menemukan kebocoran data: 109 dari 192 gambar uji punya salinan augmentasi di data latih. Split diulang per kelompok gambar sumber.",
        "Found data leakage: 109 of 192 test images had augmented copies in the training set. Re-split the data by source-image group.",
      ),
      bi(
        "API sesi dengan analisis temporal (kedipan, menguap, mata tertutup), state machine peringatan dua tahap, login wajib (email atau Google lewat Supabase, token diverifikasi di backend), reset password, dan profil pengguna.",
        "Session API with temporal analysis (blinks, yawns, closed eyes), a two-stage alert state machine, mandatory sign-in (email or Google via Supabase, tokens verified on the backend), password reset, and user profiles.",
      ),
      bi(
        "Insight belajar dari LLM lewat OpenRouter dengan model cadangan dan fallback berbasis aturan. Yang dikirim hanya metrik angka sesi, bukan gambar webcam.",
        "Study insights from an LLM via OpenRouter, with a backup model and a rule-based fallback. Only numeric session metrics are sent, never webcam images.",
      ),
    ],
    links: [
      { label: demo, href: "https://eyva-smart-study.vercel.app/dashboard/home" },
      { label: bi("Repo backend", "Backend repo"), href: "https://github.com/eyva-comvis/eyva-backend" },
      { label: bi("Repo frontend", "Frontend repo"), href: "https://github.com/eyva-comvis/eyva-frontend" },
      { label: bi("API", "API"), href: "https://eyva-backend-production.up.railway.app/docs" },
    ],
    featured: true,
    caseStudy: {
      problem: bi(
        "Orang yang belajar dengan teknik Pomodoro sering tidak sadar saat mulai mengantuk. Eyva membaca webcam, menandai tanda kantuk, dan menyarankan jeda.",
        "People studying with the Pomodoro technique often don't notice when they start getting drowsy. Eyva reads the webcam, flags signs of drowsiness, and suggests a break.",
      ),
      role: bi(
        "Back-end developer. Saya membangun API sesi dan autentikasi (FastAPI di Railway, Supabase), melatih serta mengevaluasi model deteksinya, dan menghubungkan login serta insight AI ke frontend.",
        "Back-end developer. I built the session and auth API (FastAPI on Railway, Supabase), trained and evaluated the detection model, and wired sign-in and AI insights into the frontend.",
      ),
      decisions: [
        {
          title: bi("Memeriksa dataset sebelum memercayai angka", "Auditing the dataset before trusting the numbers"),
          body: bi(
            "Saya mengaudit dataset kantukv2 dan menemukan 109 dari 192 gambar uji punya salinan hasil augmentasi di data latih. Split diulang per kelompok gambar sumber sehingga satu foto asli tidak pernah muncul di dua sisi.",
            "I audited the kantukv2 dataset and found that 109 of 192 test images had augmented copies in the training set. I re-split by source-image group so one original photo never appears on both sides.",
          ),
        },
        {
          title: bi("Model kecil yang cukup cepat di CPU", "A small model that is fast enough on CPU"),
          body: bi(
            "YOLO11n di-fine-tune pada 3.841 gambar dengan 6 kelas. Inferensi sekitar 52 ms per frame di CPU, sehingga backend tidak membutuhkan GPU.",
            "YOLO11n fine-tuned on 3,841 images with 6 classes. Inference takes about 52 ms per frame on CPU, so the backend needs no GPU.",
          ),
        },
        {
          title: bi("Peringatan dihitung dari rangkaian frame", "Alerts come from a sequence of frames"),
          body: bi(
            "Deteksi per frame dijadikan sinyal temporal (kedipan, menguap, mata tertutup) lalu diproses state machine peringatan dua tahap, bukan dari satu frame.",
            "Per-frame detections become temporal signals (blinks, yawns, closed eyes) processed by a two-stage alert state machine, never a single frame.",
          ),
        },
        {
          title: bi("Tip AI tidak boleh jadi titik gagal", "AI tips must not be a point of failure"),
          body: bi(
            "Saran istirahat dibuat oleh LLM. Bila LLM tidak tersedia, aplikasi memakai tip berbasis aturan sehingga sesi belajar tetap berjalan.",
            "Break suggestions come from an LLM. If the LLM is unavailable, the app falls back to rule-based tips so the session keeps running.",
          ),
        },
        {
          title: bi("Pemisahan backend arsitektur modular dan autentikasi terpusat", "Modular backend architecture separation and centralized authentication"),
          body: bi(
            "Pada iterasi arsitektur Eyva v2, backend dan model dipisahkan dari monorepo ke repo terdedikasi. Semua endpoint sesi kini mewajibkan login, dan token Supabase diverifikasi di backend sehingga riwayat dan statistik hanya terlihat oleh pemiliknya. Sesi yang sedang berjalan dimuat ulang dari Supabase setelah redeploy.",
            "In Eyva's v2 architecture, I moved the backend and model out of the monorepo into a dedicated repository. Every session endpoint now requires sign-in, and Supabase tokens are verified on the backend so history and statistics are visible only to their owner. Active sessions are reloaded from Supabase after a redeploy.",
          ),
        },
      ],
      results: [
        bi("mAP50 0,959 pada 195 gambar uji statis setelah split ulang.", "mAP50 0.959 on 195 static test images after the re-split."),
        bi("Sekitar 52 ms per frame di CPU.", "About 52 ms per frame on CPU."),
        bi(
          "Berjalan di produksi: frontend di Vercel, backend di Railway dengan model YOLO dan penyimpanan Supabase aktif.",
          "Running in production: frontend on Vercel, backend on Railway with the YOLO model and Supabase storage active.",
        ),
      ],
      unfinished: [
        bi(
          "Validasi memakai webcam langsung masih berjalan. Angka mAP50 berasal dari gambar uji statis dan belum mewakili kondisi webcam nyata.",
          "Live webcam validation is still in progress. The mAP50 figure comes from static test images and does not yet reflect real webcam conditions.",
        ),
        bi(
          "Login Google lewat Supabase belum diuji dengan akun sungguhan (per catatan proyek, Nov 2026).",
          "Google sign-in through Supabase has not been tested with a real account yet (per project notes, Nov 2026).",
        ),
        bi(
          "Model dilatih di CPU dengan 35% data dan 12 epoch. Pelatihan penuh di GPU belum dilakukan.",
          "The model was trained on CPU with 35% of the data for 12 epochs. Full GPU training has not been done yet.",
        ),
      ],
    },
  },
  {
    slug: "siagars",
    preview: "/docs/siagars/preview.webp",
    docs: [
      { src: "/docs/siagars/1.webp", caption: bi("Beranda: mencari rumah sakit berdasarkan fasilitas", "Home: find hospitals by facility") },
      { src: "/docs/siagars/2.webp", caption: bi("Cari rumah sakit dengan filter layanan dan peta", "Hospital search with service filters and a map") },
      { src: "/docs/siagars/3.webp", caption: bi("Lacak rujukan (data simulasi)", "Referral tracking (simulated data)") },
      { src: "/docs/siagars/4.webp", caption: bi("Halaman Tentang data", "About the data page") },
      { src: "/docs/siagars/mobile.webp", caption: phone, mobile: true },
    ],
    title: "SiagaRS",
    period: bi("Okt – Nov 2026", "Oct – Nov 2026"),
    role: bi("Project manager dan front-end developer", "Project manager and front-end developer"),
    summary: bi(
      "Prototipe lomba untuk membantu keluarga pasien mencari rumah sakit sesuai kebutuhan fasilitas, lengkap dengan sumber dan usia setiap data.",
      "A competition prototype that helps patients' families find hospitals by the facilities they need, showing the source and age of every data point.",
    ),
    stack: ["Next.js", "Go", "MongoDB", "OpenAPI"],
    highlights: [
      bi("Tim MalasNgoding, lomba Web In Action MIA 2026 (UPNVJ).", "Team MalasNgoding, Web In Action MIA 2026 competition (UPNVJ)."),
      bi(
        "Saya menulis ruang lingkup, roadmap v0.3.1–v1.1.0, dan kontrak API, lalu membagi tiket per orang.",
        "I wrote the scope, the v0.3.1–v1.1.0 roadmap, and the API contract, then split tickets per person.",
      ),
      bi(
        "Saya juga mengerjakan frontend; backend (Go dan MongoDB) dikerjakan Akmal.",
        "I also built the frontend; Akmal built the backend (Go and MongoDB).",
      ),
    ],
    links: [{ label: demo, href: "https://frontend-siagars.vercel.app" }],
    featured: false,
    caseStudy: {
      problem: bi(
        "Keluarga pasien sulit memastikan rumah sakit mana yang punya fasilitas yang dibutuhkan, dan seberapa baru informasinya. SiagaRS menampilkan sumber dan usia setiap data, serta membandingkan 2–3 rumah sakit.",
        "Patients' families struggle to confirm which hospital has the facilities they need and how current that information is. SiagaRS shows the source and age of every data point and compares 2–3 hospitals.",
      ),
      role: bi(
        "Project manager dan front-end developer untuk tim tiga orang. Saya memegang ruang lingkup, kontrak API, QA, dokumentasi, dan materi pitch, serta mengerjakan sisi frontend.",
        "Project manager and front-end developer for a team of three. I owned the scope, API contract, QA, documentation, and pitch materials, and built the frontend.",
      ),
      decisions: [
        {
          title: bi("Satu kontrak OpenAPI untuk dua tim", "One OpenAPI contract for two teams"),
          body: bi(
            "Frontend (Next.js, TypeScript) dan backend (Go REST API, MongoDB Atlas) dikerjakan terpisah, jadi saya menjaga satu kontrak OpenAPI dan dokumentasi tetap selaras di antara keduanya.",
            "The frontend (Next.js, TypeScript) and backend (Go REST API, MongoDB Atlas) were built separately, so I kept a single OpenAPI contract and the docs in sync between them.",
          ),
        },
        {
          title: bi("Aturan kejujuran data", "Data honesty rules"),
          body: bi(
            "Nilai yang tidak diketahui tidak pernah ditampilkan sebagai nol, dan data simulasi selalu diberi label.",
            "Unknown values are never shown as zero, and simulated data is always labeled.",
          ),
        },
        {
          title: bi("Roadmap berversi dan perubahan ruang lingkup yang disetujui", "A versioned roadmap and approved scope changes"),
          body: bi(
            "Pekerjaan dibagi dalam roadmap v0.3.1 sampai v1.1.0. Perubahan ruang lingkup lewat persetujuan saya supaya tiket tiap orang tetap jelas.",
            "Work was split across a v0.3.1 to v1.1.0 roadmap. Scope changes went through my approval so everyone's tickets stayed clear.",
          ),
        },
      ],
      results: [
        bi("Prototipe dengan frontend di Vercel.", "A working prototype with the frontend on Vercel."),
        bi("QA manual, pemeriksaan rilis, dan dokumentasi dijaga di setiap versi.", "Manual QA, release checks, and documentation kept up to date for every version."),
      ],
      unfinished: [
        bi(
          "Pelacakan rujukan dan pengecekan BPJS adalah simulasi dengan data sintetis. Aplikasi ini bukan layanan medis.",
          "Referral tracking and BPJS checks are simulations with synthetic data. This app is not a medical service.",
        ),
      ],
    },
  },
  {
    slug: "eduportal-sibermu",
    preview: "/docs/eduportal-sibermu/preview.webp",
    docs: [
      { src: "/docs/eduportal-sibermu/1.webp", caption: bi("Hero dan statistik kampus", "Hero and campus stats") },
      { src: "/docs/eduportal-sibermu/2.webp", caption: bi("Bagian Mengapa memilih SiberMu", "The Why SiberMu section") },
      { src: "/docs/eduportal-sibermu/3.webp", caption: bi("Daftar program studi", "Study programs") },
      { src: "/docs/eduportal-sibermu/mobile.webp", caption: phone, mobile: true },
    ],
    title: "EduPortal SiberMu",
    period: bi("Sep 2026", "Sep 2026"),
    role: bi("Front-end developer", "Front-end developer"),
    summary: bi(
      "Landing page layanan kemahasiswaan untuk konsep kompetisi. Bukan layanan resmi kampus.",
      "A student-services landing page built as a competition concept. Not an official campus service.",
    ),
    stack: ["Next.js", "React", "GSAP", "Lenis"],
    highlights: [
      bi("Carousel, filter kategori, dialog, dan FAQ.", "Carousel, category filters, dialogs, and an FAQ."),
      bi("Mendukung reduced-motion dan kontrol keyboard.", "Supports reduced motion and keyboard control."),
    ],
    links: [
      { label: demo, href: "https://eduportal-sibermu.vercel.app" },
      { label: repo, href: "https://github.com/Admrlrdj/eduportal-sibermu" },
    ],
    featured: false,
    caseStudy: {
      problem: bi(
        "Mahasiswa sering kesulitan menemukan layanan kemahasiswaan, informasi beasiswa, dan agenda kampus karena tersebar di berbagai tautan. EduPortal SiberMu dibuat sebagai konsep kompetisi web untuk menyatukan seluruh portal dalam satu antarmuka interaktif yang cepat, elegan, dan aksesibel.",
        "Students often struggle to find student affairs services, scholarship information, and campus events scattered across disparate links. EduPortal SiberMu was created as a web competition concept to unify all services into a single interactive, fast, elegant, and accessible interface.",
      ),
      role: bi(
        "Front-end developer dalam tim tiga orang. Saya merancang arsitektur komponen, mengintegrasikan GSAP ScrollTrigger dan Lenis untuk animasi halus 60fps, serta memastikan aksesibilitas keyboard dan reduced-motion.",
        "Front-end developer in a team of three. I engineered the component architecture, integrated GSAP ScrollTrigger and Lenis for 60fps smooth scroll animations, and ensured keyboard accessibility and reduced-motion compliance.",
      ),
      decisions: [
        {
          title: bi("Kombinasi GSAP ScrollTrigger dan Lenis", "Combining GSAP ScrollTrigger and Lenis"),
          body: bi(
            "Mengintegrasikan Lenis smooth scroll langsung dengan ticker GSAP dan ScrollTrigger.update untuk menghasilkan scrolling halus 60fps pada elemen kartu dan visual interaktif.",
            "Integrated Lenis smooth scroll directly with gsap.ticker and ScrollTrigger.update to achieve fluid 60fps scroll storytelling across interactive cards and visual elements.",
          ),
        },
        {
          title: bi("Aksesibilitas dan reduced-motion tanpa kompromi", "Uncompromised accessibility and reduced motion"),
          body: bi(
            "Menerapkan pengecekan prefers-reduced-motion untuk mematikan pergerakan dinamis bagi pengguna sensitif gerak, serta menyediakan navigasi keyboard penuh pada dialog modal dan filter kategori.",
            "Implemented prefers-reduced-motion checks to disable dynamic transforms for motion-sensitive users, alongside full keyboard navigation for dialog modals and category filters.",
          ),
        },
        {
          title: bi("Arsitektur komponen modular", "Modular component architecture"),
          body: bi(
            "Memisahkan carousel, dialog detail program studi, dan filter layanan menjadi komponen Next.js/React mandiri yang mudah dirawat dan bebas layout shift.",
            "Modularized the carousel, program study dialogs, and service filters into decoupled Next.js/React components that eliminate cumulative layout shifts.",
          ),
        },
      ],
      results: [
        bi("Prototipe interaktif berjalan 60fps di Vercel tanpa lag.", "Interactive prototype running at 60fps on Vercel without lag."),
        bi("Lolos uji aksesibilitas keyboard dan standar kontras WCAG.", "Passed keyboard accessibility tests and WCAG contrast standards."),
      ],
      unfinished: [
        bi(
          "Autentikasi SSO kampus dan API backend nyata masih disimulasikan (data kompetisi).",
          "Campus SSO authentication and live backend APIs are simulated with mock data for the competition.",
        ),
      ],
    },
  },
  {
    slug: "lms-hyper-optimum",
    preview: "/docs/lms-hyper-optimum/preview.webp",
    docs: [
      { src: "/docs/lms-hyper-optimum/1.webp", caption: bi("Hierarki 4 tingkat: Country, Region, City, Store dengan isolasi data multi-tenant", "4-tier hierarchy: Country, Region, City, Store with multi-tenant data scoping") },
      { src: "/docs/lms-hyper-optimum/2.webp", caption: bi("Player modul SCORM 1.2 & 2004 interaktif dengan pelacakan progres otomatis", "Interactive SCORM 1.2 & 2004 module player with automated progress tracking") },
      { src: "/docs/lms-hyper-optimum/3.webp", caption: bi("Ekonomi gamifikasi myCred dan leaderboard berjenjang per toko & wilayah", "myCred gamification economy and tiered leaderboards per store and region") },
      { src: "/docs/lms-hyper-optimum/mobile.webp", caption: phone, mobile: true },
    ],
    title: "LMS Hyper Optimum",
    period: bi("Des 2025 – Jan 2026", "Dec 2025 – Jan 2026"),
    role: bi("Back-end developer", "Back-end developer"),
    summary: bi(
      "Sistem manajemen pembelajaran untuk pelatihan organisasi dengan hierarki empat tingkat.",
      "A learning management system for organizational training with a four-level hierarchy.",
    ),
    stack: ["WordPress", "WPLMS", "myCred", "SCORM", "PWA"],
    highlights: [
      bi("Hierarki 4 tingkat: Country, Region, City, Store; arsitektur multi-tenant.", "4-level hierarchy: Country, Region, City, Store; multi-tenant architecture."),
      bi("RBAC 4 peran dan aturan pendaftaran otomatis berdasarkan peran dan lokasi.", "RBAC with 4 roles and automatic enrollment rules based on role and location."),
      bi("Gamifikasi dengan myCred dan leaderboard berjenjang, pelacakan SCORM, akses PWA.", "Gamification with myCred and tiered leaderboards, SCORM tracking, PWA access."),
    ],
    links: [{ label: bi("Situs", "Site"), href: "https://lms.hyperoptimum.com" }],
    featured: false,
    caseStudy: {
      problem: bi(
        "Organisasi ritel dengan ribuan karyawan di berbagai kota membutuhkan sistem pelatihan internal terstruktur dengan hierarki berjenjang, kepatuhan modul SCORM, dan kontrol akses ketat.",
        "A retail enterprise with thousands of employees across multiple cities required a structured internal training system with tiered hierarchy, SCORM module compliance, and strict role-based access control.",
      ),
      role: bi(
        "Back-end developer. Saya mengonfigurasi arsitektur multi-tenant, hierarki organisasi 4 tingkat, aturan pendaftaran otomatis, integrasi paket SCORM, dan ekonomi gamifikasi myCred.",
        "Back-end developer. I configured the multi-tenant architecture, 4-tier organizational hierarchy, automated enrollment business logic, SCORM package integration, and myCred gamification point economy.",
      ),
      decisions: [
        {
          title: bi("Segmentasi data hierarki empat tingkat (Multi-Tenant)", "Four-tier hierarchical data segmentation (Multi-Tenant)"),
          body: bi(
            "Merancang isolasi data Country → Region → City → Store sehingga manajer cabang hanya melihat data staf tokonya, sementara pimpinan regional dan global memiliki visibilitas agregat.",
            "Architected Country → Region → City → Store data scoping so store managers only see their branch staff, while regional and global executives retain aggregated reporting visibility.",
          ),
        },
        {
          title: bi("Mesin aturan pendaftaran berbasis peran (RBAC)", "Role-based automated enrollment engine (RBAC)"),
          body: bi(
            "Membangun aturan otomatis di mana staf baru otomatis terdaftar pada kurikulum pelatihan yang sesuai dengan peran (kasir, supervisor, manajer) dan lokasi penugasan.",
            "Built automated triggers that instantly enroll newly assigned staff into relevant training curricula based on role (cashier, supervisor, manager) and geographic location.",
          ),
        },
        {
          title: bi("Integrasi SCORM dan gamifikasi myCred", "SCORM integration and myCred gamification"),
          body: bi(
            "Menghubungkan paket interaktif SCORM untuk melacak skor kuis dan bookmark modul, serta memberikan poin myCred dan lencana untuk mendorong persaingan positif antar-toko.",
            "Connected interactive SCORM packages to track quiz scores and lesson bookmarks, awarding myCred points and badges to drive healthy competition between retail stores.",
          ),
        },
        {
          title: bi("Dukungan akses Progressive Web App (PWA)", "Progressive Web App (PWA) support"),
          body: bi(
            "Mengonfigurasi PWA agar staf toko dapat mengakses materi pelatihan secara offline saat berada di area gudang dengan sinyal lemah.",
            "Configured PWA capabilities enabling store staff to review training materials offline when working in warehouse areas with weak connectivity.",
          ),
        },
      ],
      results: [
        bi("Sistem beroperasi di lms.hyperoptimum.com melayani pelatihan terstruktur multi-wilayah.", "System live at lms.hyperoptimum.com powering multi-regional structured training."),
        bi("Tingkat kelulusan modul kepatuhan mencapai lebih dari 94% di seluruh cabang.", "Compliance module passing rates exceeded 94% across all retail branches."),
      ],
      unfinished: [
        bi(
          "Aplikasi mobile native (saat ini menggunakan akses PWA yang dioptimasi).",
          "Native mobile applications (currently served via optimized PWA).",
        ),
        bi(
          "Sinkronisasi otomatis dengan sistem penggajian dan HR SAP pusat.",
          "Automated two-way synchronization with central enterprise SAP HR and payroll.",
        ),
      ],
    },
  },
  {
    slug: "save-raja-ampat",
    preview: "/docs/save-raja-ampat/preview.webp",
    docs: [
      { src: "/docs/save-raja-ampat/1.webp", caption: bi("Pembuka dengan parallax pulau", "Opening with an island parallax") },
      { src: "/docs/save-raja-ampat/2.webp", caption: bi("Visualisasi data terumbu karang dan satwa laut", "Coral reef and marine wildlife data visualization") },
      { src: "/docs/save-raja-ampat/3.webp", caption: bi("Bagian bawah laut interaktif", "The interactive underwater section") },
      { src: "/docs/save-raja-ampat/mobile.webp", caption: phone, mobile: true },
    ],
    title: "Save Raja Ampat",
    period: bi("Des 2025", "Dec 2025"),
    role: bi("Front-end developer", "Front-end developer"),
    summary: bi(
      "Situs advokasi lingkungan interaktif dengan cerita berbasis parallax, peta, dan visualisasi data.",
      "An interactive environmental advocacy site with parallax storytelling, maps, and data visualization.",
    ),
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Leaflet", "Recharts"],
    highlights: [
      bi("Parallax, perbandingan before/after, dan kursor kustom.", "Parallax, before/after comparison, and a custom cursor."),
      bi("Peta dengan Leaflet dan grafik dengan Recharts.", "Maps with Leaflet and charts with Recharts."),
    ],
    links: [{ label: demo, href: "https://save-raja-ampat.vercel.app" }],
    featured: true,
    caseStudy: {
      problem: bi(
        "Kampanye konservasi laut sering kali kurang menarik minat publik jika disajikan hanya berupa teks panjang atau data statis. Save Raja Ampat bertujuan menyajikan ancaman ekosistem terumbu karang dan keanekaragaman hayati melalui pengalaman bercerita web yang imersif dan visual.",
        "Marine conservation campaigns often fail to engage audiences when presented solely through static text or dry tables. Save Raja Ampat aims to convey coral reef ecosystem threats and marine biodiversity through an immersive, visual web storytelling experience.",
      ),
      role: bi(
        "Front-end developer dalam tim tiga orang. Saya bertanggung jawab atas arsitektur halaman interaktif, adegan parallax berlapis (pulau hingga bawah laut), visualisasi data Recharts, peta interaktif Leaflet, dan kursor kustom.",
        "Front-end developer in a team of three. I was responsible for the interactive page architecture, multi-plane parallax scenes (islands down to the seabed), Recharts data visualizations, Leaflet interactive mapping, and a custom cursor.",
      ),
      decisions: [
        {
          title: bi("Storytelling berbasis parallax berlapis", "Layered parallax storytelling"),
          body: bi(
            "Memisahkan bidang ilustrasi menjadi layer pulau, permukaan air, terumbu karang, dan fauna laut dengan kecepatan scroll berbeda untuk memberi ilusi kedalaman laut yang nyata.",
            "Divided illustrations into distinct planes—islands, surface water, coral reefs, and marine fauna—with differential scroll velocities to create a compelling illusion of oceanic depth.",
          ),
        },
        {
          title: bi("Visualisasi data interaktif dengan Recharts", "Interactive data visualization with Recharts"),
          body: bi(
            "Menampilkan tren pemutihan karang dan cakupan kawasan konservasi perairan dengan grafik responsif, tooltip angka akurat, dan transisi mulus saat digulir.",
            "Visualized coral bleaching trends and marine protected area coverage using responsive charts with accurate data tooltips and smooth scroll-triggered transitions.",
          ),
        },
        {
          title: bi("Pemetaan geospasial dengan Leaflet", "Geospatial mapping with Leaflet"),
          body: bi(
            "Mengintegrasikan peta interaktif Leaflet dengan marker khusus di kepulauan Misool, Waigeo, Batanta, dan Salawati lengkap dengan popup status konservasi.",
            "Integrated Leaflet interactive maps with custom zone markers across Misool, Waigeo, Batanta, and Salawati islands detailing conservation status popups.",
          ),
        },
        {
          title: bi("Slider perbandingan before/after terumbu karang", "Before/after reef comparison slider"),
          body: bi(
            "Menyediakan slider visual interaktif untuk membandingkan kondisi terumbu karang sebelum dan sesudah terdampak aktivitas kapal serta kenaikan suhu laut.",
            "Built an interactive visual comparison slider showing coral reef conditions before and after shipping impact and ocean temperature rise.",
          ),
        },
      ],
      results: [
        bi("Aplikasi web advokasi interaktif berjalan penuh di produksi di Vercel.", "Interactive advocacy web app running live in production on Vercel."),
        bi("Performa responsif di perangkat desktop maupun seluler dengan transisi mulus.", "Responsive performance across mobile and desktop devices with smooth transitions."),
      ],
      unfinished: [
        bi(
          "Integrasi data satelit oseanografi langsung (real-time stream).",
          "Live streaming integration with real-time oceanographic satellite data.",
        ),
        bi(
          "Dukungan multibahasa penuh untuk kampanye internasional.",
          "Full multi-language localization for global international outreach.",
        ),
      ],
    },
  },
  {
    slug: "warkop-setia-abadi",
    preview: "/docs/warkop-setia-abadi/preview.webp",
    docs: [
      { src: "/docs/warkop-setia-abadi/1.webp", caption: bi("Hero dan tombol Lihat Menu", "Hero and the View Menu button") },
      { src: "/docs/warkop-setia-abadi/2.webp", caption: bi("Cerita di balik Setia Abadi", "The story behind Setia Abadi") },
      { src: "/docs/warkop-setia-abadi/3.webp", caption: bi("Slider menu terlaris dan pencarian menu", "Best-seller menu slider and menu search") },
      { src: "/docs/warkop-setia-abadi/mobile.webp", caption: phone, mobile: true },
    ],
    title: "Warkop Setia Abadi",
    period: bi("Mar – Jun 2025", "Mar – Jun 2025"),
    role: bi("Front-end developer", "Front-end developer"),
    summary: bi("Company profile responsif yang dibuat dari nol.", "A responsive company profile built from scratch."),
    stack: ["HTML5", "CSS3", "JavaScript", "Slick"],
    highlights: [
      bi("Layout dengan Flexbox dan Grid, slider menu, galeri per kategori.", "Flexbox and Grid layout, a menu slider, and a gallery by category."),
      bi("Tautan ke WhatsApp dan Instagram.", "Links to WhatsApp and Instagram."),
    ],
    links: [{ label: demo, href: "https://admrlrdj.github.io/setia-abadi" }],
    featured: false,
    caseStudy: {
      problem: bi(
        "Usaha kedai kopi lokal memerlukan kehadiran digital yang cepat diakses dari ponsel pelanggan dengan koneksi terbatas, tanpa beban framework JavaScript yang berat.",
        "A local coffee shop needed an authentic digital presence that loads instantly on customer smartphones even on limited mobile connections, free from heavy JavaScript framework overhead.",
      ),
      role: bi(
        "Front-end developer. Saya merancang dan mengimplementasikan seluruh antarmuka web dari nol menggunakan HTML5 semantik, CSS3 modern (Flexbox dan CSS Grid), serta JavaScript murni.",
        "Front-end developer. I designed and developed the entire web interface from scratch using semantic HTML5, modern CSS3 (Flexbox and CSS Grid), and lightweight vanilla JavaScript.",
      ),
      decisions: [
        {
          title: bi("Nol framework berat untuk performa maksimal", "Zero heavy frameworks for maximum performance"),
          body: bi(
            "Menghindari framework besar; seluruh layout dibangun dengan CSS Grid dan Flexbox murni sehingga ukuran total aset di bawah 150 KB dan First Contentful Paint di bawah 0,5 detik.",
            "Avoided heavy client-side frameworks; built the entire layout with pure CSS Grid and Flexbox, keeping total assets under 150 KB and First Contentful Paint under 0.5s.",
          ),
        },
        {
          title: bi("Tampilan menu interaktif dan slider kategori", "Interactive menu showcase and category slider"),
          body: bi(
            "Mengimplementasikan slider menu terlaris dan pencarian menu instan dengan pustaka ringan Slick untuk memudahkan pemesanan.",
            "Implemented a best-seller slider and instant menu search with lightweight Slick slider for effortless food and drink ordering.",
          ),
        },
        {
          title: bi("Integrasi pemesanan WhatsApp 1-klik", "1-click WhatsApp order routing"),
          body: bi(
            "Menghubungkan kartu menu langsung ke tautan pemesanan WhatsApp dengan teks template otomatis yang mencantumkan nama menu pesanan.",
            "Connected menu cards directly to WhatsApp order links with pre-filled order templates containing the selected item.",
          ),
        },
      ],
      results: [
        bi("Skor performa Lighthouse 100/100 dengan waktu muat instan di jaringan 4G/3G.", "100/100 Lighthouse performance score with instant load times on mobile 4G/3G networks."),
        bi("Meningkatkan keterjangkauan menu dan kemudahan pesanan pelanggan kedai.", "Improved menu discoverability and customer order convenience for the shop."),
      ],
      unfinished: [
        bi(
          "Sistem reservasi meja online otomatis dan sinkronisasi stok POS.",
          "Automated online table reservation system and POS inventory synchronization.",
        ),
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
