# Panduan membuat scene Spline "Ruang Kerja" (langkah demi langkah)

Panduan ini melengkapi [SPLINE_SCENE.md](SPLINE_SCENE.md) (daftar nama objek dan event). Nama menu diambil dari dokumentasi Spline; tampilan editor bisa berubah, jadi cocokkan dengan yang kamu lihat di layar.

Target: satu ruangan isometrik dengan lima benda yang bisa diklik, memakai bentuk dasar saja. Tidak perlu Blender.

## 0. Sebelum mulai

- Buat akun gratis di spline.design. Cek batas paket gratis (jumlah file dan fitur ekspor) sebelum membangun, karena ekspor kode dan variabel bisa berbeda per paket.
- Kamu hanya perlu satu scene. Pakai kamera orthographic supaya hasilnya isometrik seperti gambar SVG yang sekarang tampil di situs.
- Buka situs lokal (`npm run dev`) di sebelah editor; gambar SVG di section "Ruang kerja" adalah acuan tata letaknya.

## 1. Siapkan scene

1. Buat file baru, ganti nama menjadi `workroom`.
2. Atur kamera ke **Orthographic**, sudut sekitar 35° dari atas dan 45° ke samping (pandangan isometrik). Biarkan ruangan memenuhi bingkai dengan sedikit ruang kosong di tepi.
3. Latar belakang transparan atau satu warna datar sama dengan `--paper-sunk` situs (lihat tabel warna di bawah). Tanpa gradasi, kabut, atau bloom.

## 2. Warna (dari palet situs)

| Peran | Terang (`day`) | Gelap (`night`) |
|---|---|---|
| Latar kotak | `#EBE7DD` | `#151A21` |
| Lantai | `#E4DFD2` | `#1B2028` |
| Dinding kiri | `#D6D1C4` | `#2A313B` |
| Dinding kanan | `#CBC5B6` | `#323A46` |
| Benda netral | `#8A8A86` sampai `#BDB9AE` | `#5B626C` sampai `#8E949C` |
| Layar monitor | `#0E1116` | `#ECE8DF` |
| Aksen (hanya saat disorot) | `#C23E1A` | `#FF7A55` |

Aksen jangan dipakai sebagai warna dasar benda. Aksen hanya menyala pada benda yang sedang di-hover.

## 3. Bangun ruangan dari bentuk dasar

Satuan di bawah mengikuti gambar SVG (1 unit sekitar satu kotak lantai). Tidak harus presisi.

1. **Lantai:** satu Cube pipih, 10 × 10, tinggi tipis.
2. **Dinding kiri dan kanan:** dua Cube tipis, tinggi 6, bertemu di sudut belakang. Hanya dua dinding yang terlihat; jangan buat dinding depan.
3. **Meja:** satu Cube panjang di dinding kanan, tinggi sekitar 2,2.
4. **Monitor:** satu Cube pipih sebagai layar di atas meja, satu Cube kecil sebagai penyangga. Beri layar warna layar dari tabel. Opsional: tiga garis tipis terang di layar sebagai "kode".
5. **Kalender:** Cube sangat tipis di dinding kanan, di atas meja sisi kiri. Tambahkan kotak-kotak kecil untuk tanggal.
6. **Bingkai sertifikat:** dua Cube sangat tipis bertumpuk (bingkai dan kertas) di dinding kanan, sisi kanan meja.
7. **Rak buku:** satu Cube tipis sebagai papan di dinding kiri, lalu lima Cube berdiri dengan tinggi dan warna netral berbeda sebagai buku.
8. **Ponsel:** Cube tipis gelap di atas meja bagian depan.
9. **Kursi:** dua Cube (dudukan dan sandaran) plus satu tiang. Dekoratif, tidak diklik.

Pakai material dasar (Color atau Standard) dengan roughness tinggi. Hindari tekstur gambar dan peta lingkungan HDR berat: itu penyebab utama ukuran scene membengkak (referensi `al.is-a.dev` memakai model sekitar 4 MB plus HDR sekitar 1,5 MB).

## 4. Beri nama objek dan jadikan group

Untuk benda yang terdiri dari beberapa bagian, pilih semua bagiannya lalu **Group**, dan beri nama group persis:

| Benda | Nama group |
|---|---|
| Monitor + penyangga | `hotspot-proyek` |
| Kalender + kotak tanggal | `hotspot-pengalaman` |
| Papan + semua buku | `hotspot-keahlian` |
| Bingkai + kertas | `hotspot-pendidikan` |
| Ponsel | `hotspot-kontak` |

Ejaan, huruf kecil, dan tanda hubung harus sama persis. Kode situs mencocokkan nama ini; salah satu huruf saja membuat benda tidak bereaksi.

## 5. Pasang event

Untuk tiap group `hotspot-*`:

1. Buka panel **Events** dan tambah **Mouse Hover**. Aksi yang disarankan: angkat objek sedikit (Transition posisi naik kecil) dan ubah warna ke aksen. Menurut dokumentasi Spline, aksi hover otomatis kembali ke keadaan awal saat kursor keluar.
2. Tambah **Mouse Down** pada group yang sama. **Jangan beri aksi** (kosongkan). Event ini hanya perlu ada supaya situs menerima klik; situs sendiri yang menggulung halaman.

## 6. Siang dan malam mengikuti tema (opsional; belum dibuat di scene yang diekspor, lihat SPLINE_SCENE.md)

1. Di panel **Variables**, buat variabel bertipe **String** bernama `theme` dengan nilai awal `day`.
2. Buat dua keadaan (state) untuk warna lantai, dinding, benda, layar, dan langit: `day` dan `night`, memakai tabel warna di atas.
3. Hubungkan perubahan variabel `theme` ke perpindahan state tersebut (aksi Set Variable atau kontrol variabel sesuai dokumentasi Spline).

Situs memanggil `setVariables({ theme: "day" | "night" })` saat dimuat dan setiap kali tombol tema ditekan. Jika kamu melewati langkah ini, scene tetap jalan dengan satu tampilan.

## 7. Ekspor dan ambil URL

1. Pada tombol **Export**, pilih **Code**, lalu tipe **Next.js** (ada juga React, Vanilla JS, dan lain-lain).
2. Salin URL scene publik yang berakhiran `scene.splinecode`.
3. Jika kamu mengubah scene setelah ekspor, pastikan **Draft** yang bertanda Production sudah diperbarui. Dokumentasi Spline menyebut URL utama menunjuk ke Draft Production, jadi tanpa itu situs menyajikan versi lama.

## 8. Pasang di situs

1. Buat file `.env.local` di folder `portfolio` (file ini tidak ikut git):
   ```
   NEXT_PUBLIC_SPLINE_SCENE_URL=<url scene yang kamu salin>
   ```
2. Jalankan `npm run dev`, buka situs, gulung ke "Ruang kerja".
3. Di Vercel, tambahkan variabel yang sama di Settings, Environment Variables, lalu redeploy. Nilainya tertanam saat build, jadi mengganti URL berarti build ulang.

## 9. Periksa sebelum dianggap selesai

- [ ] Gambar SVG diganti scene Spline setelah scene selesai dimuat (tanpa layar kosong di antaranya)
- [ ] Hover pada kelima benda menyorot tombol yang sesuai di bawah ruangan; menggeser kursor keluar dari kotak menghapus sorotan
- [ ] Klik tiap benda menggulung ke section yang benar (`#proyek`, `#pengalaman`, `#keahlian`, `#pendidikan`, `#kontak`)
- [ ] Mengganti tema terang/gelap mengubah siang/malam di scene (jika langkah 6 dikerjakan)
- [ ] Di HP, menggeser jari vertikal di atas ruangan tetap menggulung halaman
- [ ] Dengan reduced-motion aktif atau WebGL dimatikan, situs menampilkan gambar SVG dan catatan alasannya
- [ ] Ukuran unduhan scene sudah diukur di tab Network browser; tulis angkanya di `DESIGN.md` sebagai anggaran ukuran

## Jika ada yang tidak berjalan

| Gejala | Kemungkinan penyebab |
|---|---|
| Scene tidak muncul, tetap gambar SVG | URL kosong atau salah; build belum diulang setelah mengisi env di Vercel; browser menolak WebGL (cek catatan abu-abu di bawah kotak) |
| Benda tidak bereaksi | Nama group tidak persis sama, atau event Mouse Hover/Mouse Down belum ditambahkan |
| Klik tidak menggulung | Event Mouse Down belum ada pada group itu |
| Sorotan tombol tertinggal | Kursor masih di atas objek yang punya event; geser keluar dari kotak ruangan |
| Tema tidak berubah di scene | Variabel `theme` belum dibuat atau belum dihubungkan ke state; scene tetap berfungsi tanpanya |
| Scene lama muncul setelah diubah | Draft Production belum diperbarui |
| Halaman berat di HP | Kurangi objek, hapus tekstur dan HDR, lalu ekspor ulang dan ukur lagi |

## Sumber

- [Exporting as Code (Spline)](https://docs.spline.design/exporting-your-scene/web/exporting-as-code)
- [Mouse Hover Event](https://docs.spline.design/interaction-states-events-and-actions/events/mouse-hover-event)
- [Mouse Down Event](https://docs.spline.design/doc/mouse-down-event/docbTDHzds82)
- [Variables](https://docs.spline.design/interaction-states-events-and-actions/variables)
- [react-spline README](https://github.com/splinetool/react-spline/blob/main/README.md)
