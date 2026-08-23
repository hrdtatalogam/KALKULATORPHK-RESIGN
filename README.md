# Kalkulator PHK & Resign

Tool HR internal untuk menghitung kompensasi Pemutusan Hubungan Kerja (PHK) dan Pengunduran Diri (Resign), lengkap dengan checklist proses, panel admin untuk kustomisasi aturan, dan riwayat perhitungan yang tersimpan di server (bisa diakses seluruh tim).

## Fitur
- **Tab PHK**: hitung Uang Pesangon, Uang Penghargaan Masa Kerja, Uang Penggantian Hak (tiap komponen bisa on/off), dan PPh 21 Final — otomatis dari data karyawan.
- **Tab Resign**: hitung Uang Pisah (opsional) dan Uang Penggantian Hak untuk kasus pengunduran diri.
- **Tab Riwayat**: setiap export PDF otomatis tersimpan ke server (Netlify Blobs), sehingga bisa dilihat/diunduh ulang oleh siapapun di tim yang membuka link ini — bukan cuma tersimpan di satu browser.
  - Download seluruh riwayat sebagai **CSV** (untuk direkap di Excel)
  - Download seluruh riwayat sebagai **ZIP berisi PDF** per karyawan
- **Panel Admin**: kustomisasi alasan PHK & faktor pengali, tabel Uang Pisah, serta checklist proses PHK/Resign — semua bisa diedit tanpa perlu ubah kode.
- **Export PDF**: lembar pertama rincian perhitungan, lembar berikutnya checklist proses dalam format tabel.

## Struktur Proyek
```
index.html                     -> aplikasi utama (frontend)
netlify/functions/history.js   -> Netlify Function untuk simpan/ambil riwayat (Netlify Blobs)
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
