// Menunggu hingga seluruh konten halaman (HTML) selesai dimuat sebelum menjalankan JavaScript.
// Ini penting untuk memastikan elemen placeholder seperti 'header-placeholder' sudah ada.
document.addEventListener('DOMContentLoaded', function() {

    /**
     * Fungsi untuk memuat komponen HTML ke dalam elemen placeholder.
     * @param {string} componentPath - Path atau lokasi file komponen (misal: 'components/header.html').
     * @param {string} placeholderId - ID dari elemen di HTML utama tempat komponen akan dimuat.
     */
    const loadComponent = (componentPath, placeholderId) => {
        // Mengambil elemen placeholder dari halaman.
        const placeholder = document.getElementById(placeholderId);
        
        // Jika elemen tidak ditemukan, hentikan fungsi untuk menghindari error.
        if (!placeholder) {
            console.error(`Placeholder dengan ID '${placeholderId}' tidak ditemukan.`);
            return;
        }

        // Menggunakan 'fetch' API untuk mengambil konten dari file komponen.
        fetch(componentPath)
            .then(response => {
                // Periksa apakah file berhasil diakses (status 200 OK).
                if (!response.ok) {
                    throw new Error(`Gagal memuat komponen: ${componentPath}`);
                }
                // Mengubah respons menjadi teks (konten HTML).
                return response.text();
            })
            .then(html => {
                // Memasukkan konten HTML dari komponen ke dalam elemen placeholder.
                placeholder.innerHTML = html;

                // Setelah header dimuat, kita perlu mengaktifkan fungsionalitas menu mobile-nya.
                if (placeholderId === 'header-placeholder') {
                    setupMobileMenu();
                }
            })
            .catch(error => {
                // Menampilkan pesan error di konsol jika terjadi masalah saat memuat.
                console.error('Error saat memuat komponen:', error);
                placeholder.innerHTML = `<p class="text-red-500 text-center">Gagal memuat ${placeholderId}.</p>`;
            });
    };

    /**
     * Fungsi untuk mengatur fungsionalitas tombol menu di perangkat mobile (hamburger menu).
     */
    const setupMobileMenu = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        // Jika tombol atau menu tidak ditemukan, hentikan fungsi.
        if (!mobileMenuButton || !mobileMenu) {
            return;
        }

        // Menambahkan 'event listener' untuk mendeteksi klik pada tombol hamburger.
        mobileMenuButton.addEventListener('click', () => {
            // 'toggle' akan menambahkan kelas 'hidden' jika belum ada, dan menghapusnya jika sudah ada.
            // Ini cara mudah untuk menampilkan/menyembunyikan menu.
            mobileMenu.classList.toggle('hidden');
        });
    };

    // Memanggil fungsi loadComponent untuk memuat semua komponen yang dibutuhkan di halaman.
    // Path harus disesuaikan berdasarkan lokasi file HTML yang memanggil script ini.
    // Misalnya, dari index.html, path-nya adalah 'components/...'
    // Dari pages/about.html, path-nya adalah '../components/...'
    
    // Cek lokasi halaman untuk menentukan path yang benar.
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
    const componentBasePath = isIndexPage ? 'components/' : '../components/';
    
    loadComponent(`${componentBasePath}header.html`, 'header-placeholder');
    loadComponent(`${componentBasePath}footer.html`, 'footer-placeholder');

    // Hanya muat hero section jika placeholder-nya ada (khusus di halaman beranda).
    if (document.getElementById('hero-placeholder')) {
        loadComponent(`${componentBasePath}hero.html`, 'hero-placeholder');
    }

});

