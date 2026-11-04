# CV di situs

Situs punya halaman `/cv` dengan pratinjau PDF, tombol unduh, dan tombol Google Drive.

## Sumber dan keluaran

| Berkas | Fungsi |
|---|---|
| `content/cv/CV_Radja_Admiral_ATS.md` | Sumber isi CV (salinan dari `About Me/CV_Radja_Admiral_ATS.md`) |
| `scripts/build-cv.mjs` | Mengubah markdown menjadi PDF satu kolom ramah ATS lewat Chrome tanpa kepala |
| `public/cv/Radja-Admiral-CV.pdf` | PDF yang ditampilkan dan diunduh di situs |

## Membuat ulang PDF

Edit `content/cv/CV_Radja_Admiral_ATS.md`, lalu:

```bash
npm run build:cv
```

Skrip mencari Chrome di lokasi umum. Jika gagal, isi `CHROME_PATH` dengan path `chrome.exe`.

## Privasi

Skrip membuang nomor telepon (`+62 ...`) dari PDF publik. Email, LinkedIn, dan GitHub tetap ada. Jika ingin versi lengkap dengan nomor telepon, unggah sendiri ke Google Drive dan batasi akses sesuai kebutuhan.

## Tombol Google Drive

Isi `NEXT_PUBLIC_CV_DRIVE_URL` di `.env.local` dan di environment Vercel, lalu redeploy. Selama kosong, tombol "Buka di Google Drive" tidak ditampilkan. Pastikan tautan Drive diatur ke "siapa saja yang memiliki link dapat melihat".

## Memakai CV desain sendiri

Timpa `public/cv/Radja-Admiral-CV.pdf` dengan PDF-mu dan jangan jalankan `npm run build:cv` lagi (perintah itu akan menimpanya). Tetap simpan versi satu kolom tanpa tabel untuk lamaran lewat ATS.

## Catatan pratinjau

Banyak browser HP tidak menampilkan PDF di dalam halaman. Karena itu pratinjau punya cadangan berupa tautan unduh, dan tombol Unduh PDF selalu tersedia di atasnya.
