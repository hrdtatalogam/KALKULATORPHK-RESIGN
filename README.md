# Kalkulator PHK & Resign

Tool HR internal untuk menghitung kompensasi Pemutusan Hubungan Kerja (PHK) dan Pengunduran Diri (Resign), lengkap dengan checklist proses dan panel admin untuk kustomisasi aturan.

## Fitur
- **Tab PHK**: hitung Uang Pesangon, Uang Penghargaan Masa Kerja, Uang Penggantian Hak (opsional per komponen), dan PPh 21 Final — otomatis dari data karyawan.
- **Tab Resign**: hitung Uang Pisah (opsional) dan Uang Penggantian Hak untuk kasus pengunduran diri.
- **Panel Admin**: kustomisasi alasan PHK & faktor pengali, tabel Uang Pisah, serta checklist proses PHK/Resign — semua bisa diedit tanpa perlu ubah kode.
- **Export PDF**: setiap hasil perhitungan + checklist bisa diexport jadi PDF siap cetak.
- Data tersimpan otomatis di browser (localStorage) — tidak memerlukan server/database.

## Cara Deploy
File ini adalah single-file HTML statis, bisa langsung di-hosting di:
- **Netlify**: drag & drop `index.html` ke [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: push repo ini, aktifkan GitHub Pages dari branch utama
- Atau dibuka langsung secara lokal di browser

## Catatan
Perhitungan mengacu pada Pasal 40 & 156 PP No. 35 Tahun 2021 (turunan UU Cipta Kerja) dan PP No. 68/2009 (PPh 21 Final atas pesangon). Nominal Uang Pisah mengikuti kebijakan internal perusahaan (bukan ketentuan pemerintah) dan bisa diatur di Panel Admin.

Semua hasil perhitungan bersifat estimasi dan wajib diverifikasi oleh Legal/HC Manager/Payroll sebelum digunakan sebagai dasar pembayaran resmi.
