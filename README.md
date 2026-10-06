# Kalkulator PHK & Resign

Tool HR internal untuk menghitung kompensasi Pemutusan Hubungan Kerja (PHK) dan Pengunduran Diri (Resign), lengkap dengan checklist proses, panel admin untuk kustomisasi aturan, dan riwayat perhitungan yang tersimpan di server (bisa diakses seluruh tim).

## Fitur
- **Tab PHK**: hitung Uang Pesangon, Uang Penghargaan Masa Kerja, Uang Penggantian Hak (tiap komponen bisa on/off), dan PPh 21 Final — otomatis dari data karyawan.
- **Tab Resign**: hitung Uang Pisah (opsional) dan Uang Penggantian Hak untuk kasus pengunduran diri.
- **Tab Progress**: karena proses PHK/resign biasanya tidak selesai dalam satu hari, setiap kali kamu mengisi form atau mencentang checklist di tab PHK/Resign, progresnya otomatis tersimpan ke server (Netlify Blobs) — lengkap dengan berapa item checklist yang sudah/belum selesai. Bisa dibuka & dilanjutkan kapan saja, dari device manapun, **tanpa harus Export PDF dulu**. Begitu kasus di-export ke PDF, otomatis dianggap selesai dan pindah ke tab Riwayat.
- **Tab Riwayat**: setiap export PDF otomatis tersimpan ke server (Netlify Blobs), sehingga bisa dilihat/diunduh ulang oleh siapapun di tim yang membuka link ini — bukan cuma tersimpan di satu browser.
  - Download seluruh riwayat sebagai **CSV** (untuk direkap di Excel)
  - Download seluruh riwayat sebagai **ZIP berisi PDF** per karyawan
- **Panel Admin**: kustomisasi alasan PHK & faktor pengali, tabel Uang Pisah, serta checklist proses PHK/Resign — semua bisa diedit tanpa perlu ubah kode.
- **Export PDF**: lembar pertama rincian perhitungan, lembar berikutnya checklist proses dalam format tabel.

## Struktur Proyek
```
index.html                     -> aplikasi utama (frontend)
netlify/functions/history.js   -> Netlify Function untuk simpan/ambil riwayat final (Netlify Blobs)
netlify/functions/cases.js     -> Netlify Function untuk simpan/ambil progress/kasus berjalan (Netlify Blobs)
netlify.toml                   -> konfigurasi build & functions
package.json                   -> dependency @netlify/blobs
```

## Cara Deploy (Netlify)
Fitur Riwayat butuh Netlify Functions + Netlify Blobs, jadi deploy-nya lewat **Git repo** (bukan drag & drop manual):

1. Push seluruh isi folder ini ke repo GitHub kamu (pertahankan struktur foldernya).
2. Di Netlify: **Add new site → Import an existing project**, hubungkan ke repo ini.
3. Build settings bisa dikosongkan/default (tidak ada build step, cukup publish root `.`) — Netlify otomatis mendeteksi `netlify.toml`.
4. Deploy. Netlify Blobs otomatis aktif tanpa perlu setup tambahan (zero-config, sudah terhubung ke site kamu).
5. Setelah live, coba export PDF sekali dari tab PHK/Resign — cek tab Riwayat untuk konfirmasi datanya masuk.

> Catatan: kalau di-drag & drop manual ke Netlify Drop (tanpa Git), Netlify Functions tidak akan aktif dan tab Riwayat tidak akan berfungsi (form tetap bisa dipakai untuk hitung & export PDF seperti biasa, hanya saja tidak tersimpan).

## Catatan Hukum
Perhitungan mengacu pada Pasal 40 & 156 PP No. 35 Tahun 2021 (turunan UU Cipta Kerja) dan PP No. 68/2009 (PPh 21 Final atas pesangon). Nominal Uang Pisah mengikuti kebijakan internal perusahaan (bukan ketentuan pemerintah) dan bisa diatur di Panel Admin.

Semua hasil perhitungan bersifat estimasi dan wajib diverifikasi oleh Legal/HC Manager/Payroll sebelum digunakan sebagai dasar pembayaran resmi.

## Update UI/UX (terbaru)
- Tampilan diperhalus dengan animasi & transisi (masuk-tab, hover tombol, checklist ter-centang, progress bar) yang tetap menghormati pengaturan "reduce motion" di device.
- Notifikasi kini pakai toast (bukan popup alert bawaan browser) untuk pengalaman yang lebih halus.
- Tab **Progress**: daftar kasus berjalan sekarang dipaginasi (5 kasus per halaman) supaya tidak memanjang ke bawah — ada tombol Sebelumnya/Berikutnya di bawah daftar.
- Tab **Riwayat**: setiap baris kini punya tombol **✎ Edit** — klik untuk memuat ulang data kasus itu ke form PHK/Resign, edit, lalu Export ulang untuk menyimpan versi terbarunya (kasus lama tetap ada di Riwayat, jadi versi baru akan jadi entri terpisah). Catatan: data lama yang sudah ada di Riwayat sebelum update ini belum menyimpan detail form, jadi tombol Edit untuk entri lama akan memberi tahu bahwa datanya tidak tersedia — entri baru setelah update ini semua sudah bisa di-edit.

## Pemisahan Perhitungan & Checklist
- Di tab PHK & Resign, setelah "Data Karyawan" ada 2 sub-halaman: **📊 Perhitungan** dan **✅ Checklist** (lengkap dengan preview PDF masing-masing).
- **Export Perhitungan ke PDF** → hanya mencetak perhitungan; kasus dianggap selesai & masuk Riwayat (snapshot checklist ikut tersimpan).
- **Export Checklist ke PDF** → mencetak checklist saja, kapan saja, tanpa menyelesaikan kasus.
- Riwayat: tombol terpisah 📊 Perhitungan dan ✅ Checklist. Entri lama (format lama) tetap bisa dicetak sebagai perhitungan.

## Tampilan responsif
- Desktop (≥1024px): layout 2 kolom di tab PHK/Resign (input di kiri, hasil/checklist di kanan), daftar Progress 2 kolom.
- Mobile (≤640px): satu kolom, tab menu grid 3 kolom, tombol besar, Riwayat tampil sebagai kartu per baris.

## Redesain tampilan (mengikuti Employee Career Development)
- Palet indigo + aksen amber, font Plus Jakarta Sans, kartu bernomor, input dan tombol bergaya sama dengan form Career.
- Hero gelap dengan grid, glow, dan grafik animasi; tab sticky efek kaca; kartu "Total Diterima" menonjol.
- Logo Tatalogam Group (`logo.png`) tampil di header, footer, favicon, dan kop PDF. Pastikan `logo.png` ikut ter-push ke repo (satu folder dengan `index.html`).
- Animasi menghormati pengaturan "reduce motion".

## Update: input Rupiah, dropdown perusahaan, preview popup
- Kolom nominal (Upah, Komponen Lain UPH, Biaya Pulang) otomatis berformat `Rp 5.000.000,-` saat diketik. Data lama (angka mentah) otomatis ikut diformat saat dibuka.
- Perusahaan kini dropdown. Isi daftarnya di **Panel Admin → Perusahaan** (tambah/ubah/hapus), atau ubah default `state.companies` di `index.html`. Daftar disimpan di browser (seperti pengaturan Admin lainnya). Kasus lama dengan nama perusahaan di luar daftar tetap tampil apa adanya.
- Preview PDF dipindah ke tombol **Preview PDF** (popup). Halaman utama hanya berisi Data Karyawan dan Hasil Perhitungan/Checklist. Popup bisa ditutup dengan tombol X, Esc, atau klik area gelap, dan punya tombol Export.
