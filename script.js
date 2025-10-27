// script.js

// Data produk Anda
const products = [
    // Membership & Paket
    { id: 'bp-card', name: 'BP Card', price: 38000, type: 'membership' },
    { id: 'm-mingguan', name: 'Membership Mingguan', price: 25800, type: 'membership' },
    { id: 'm-bulanan', name: 'Membership Bulanan', price: 77000, type: 'membership' },
    { id: 'level-up', name: 'Level Up Pass', price: 13500, type: 'membership' },

    // Diamond
    { id: 'd50', name: '50 Diamond', price: 7800, type: 'diamond' },
    { id: 'd70', name: '70 Diamond', price: 9500, type: 'diamond' },
    { id: 'd100', name: '100 Diamond', price: 13000, type: 'diamond' },
    { id: 'd120', name: '120 Diamond', price: 15500, type: 'diamond' },
    { id: 'd140', name: '140 Diamond', price: 18000, type: 'diamond' },
    { id: 'd150', name: '150 Diamond', price: 19700, type: 'diamond' },
    { id: 'd160', name: '160 Diamond', price: 21000, type: 'diamond' },
    { id: 'd170', name: '170 Diamond', price: 22000, type: 'diamond' },
    { id: 'd180', name: '180 Diamond', price: 23500, type: 'diamond' },
    { id: 'd190', name: '190 Diamond', price: 24500, type: 'diamond' },
    { id: 'd200', name: '200 Diamond', price: 25800, type: 'diamond' },
    { id: 'd250', name: '250 Diamond', price: 32000, type: 'diamond' },
    { id: 'd300', name: '300 Diamond', price: 38000, type: 'diamond' },
    { id: 'd350', name: '350 Diamond', price: 44000, type: 'diamond' },
    { id: 'd405', name: '405 Diamond', price: 49500, type: 'diamond' },
    { id: 'd420', name: '420 Diamond', price: 54000, type: 'diamond' },
    { id: 'd455', name: '455 Diamond', price: 59000, type: 'diamond' },
    { id: 'd500', name: '500 Diamond', price: 62000, type: 'diamond' },
    { id: 'd565', name: '565 Diamond', price: 69000, type: 'diamond' },
    { id: 'd600', name: '600 Diamond', price: 73000, type: 'diamond' },
    { id: 'd655', name: '655 Diamond', price: 80000, type: 'diamond' },
    { id: 'd710', name: '710 Diamond', price: 89000, type: 'diamond' },
    { id: 'd770', name: '770 Diamond', price: 95500, type: 'diamond' },
    { id: 'd800', name: '800 Diamond', price: 95197, type: 'diamond' },
    { id: 'd860', name: '860 Diamond', price: 106349, type: 'diamond' },
    { id: 'd910', name: '910 Diamond', price: 112717, type: 'diamond' },
    { id: 'd930', name: '930 Diamond', price: 115054, type: 'diamond' },
    { id: 'd1000', name: '1000 Diamond', price: 123759, type: 'diamond' },
];

const WHATSAPP_NUMBER = "6282125494438"; // Tanpa tanda '+'

// Fungsi untuk mendapatkan keranjang dari Local Storage
const getCart = () => {
    const cart = localStorage.getItem('sypaStoreCart');
    return cart ? JSON.parse(cart) : [];
};

// Fungsi untuk menyimpan keranjang ke Local Storage
const saveCart = (cart) => {
    localStorage.setItem('sypaStoreCart', JSON.stringify(cart));
    updateCartCount(); // Update hitungan keranjang setelah disimpan
};

// Fungsi untuk format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

// Fungsi untuk menambahkan produk ke keranjang
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cart = getCart();
        // Cek jika produk sudah ada
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            // Jika ada, tambahkan jumlahnya (kita asumsikan 1x klik = 1 kuantitas)
            existingItem.quantity += 1; 
        } else {
            // Jika belum ada, tambahkan item baru
            cart.push({ ...product, quantity: 1 });
        }

        saveCart(cart);
        alert(`${product.name} telah ditambahkan ke keranjang!`);
    }
};

// Fungsi untuk menghapus item dari keranjang (hanya di cart.html)
const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart(); // Render ulang keranjang setelah dihapus
};

// Fungsi untuk mengupdate hitungan keranjang di header
const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
};

// --- Logika untuk index.html ---
const renderProducts = () => {
    const membershipList = document.getElementById('membership-list');
    const diamondList = document.getElementById('diamond-list');

    if (!membershipList || !diamondList) return; // Stop jika bukan di index.html

    const membershipProducts = products.filter(p => p.type === 'membership');
    const diamondProducts = products.filter(p => p.type === 'diamond');

    // Render Membership
    membershipList.innerHTML = membershipProducts.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>${formatRupiah(p.price)}</p>
            <button class="add-to-cart-btn" data-id="${p.id}">Tambahkan ke Keranjang</button>
        </div>
    `).join('');

    // Render Diamond
    diamondList.innerHTML = diamondProducts.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>${formatRupiah(p.price)}</p>
            <button class="add-to-cart-btn" data-id="${p.id}">Tambahkan ke Keranjang</button>
        </div>
    `).join('');

    // Tambahkan event listener untuk tombol "Tambahkan ke Keranjang"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            addToCart(productId);
        });
    });
};

// --- Logika untuk cart.html ---
const renderCart = () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutFormElement = document.getElementById('checkout-form');
    const emptyMessageElement = document.getElementById('empty-cart-message');

    if (!cartItemsElement || !totalPriceElement) return; // Stop jika bukan di cart.html

    const cart = getCart();
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '';
        totalPriceElement.textContent = formatRupiah(0);
        checkoutFormElement.style.display = 'none';
        emptyMessageElement.style.display = 'block';
        return;
    }

    checkoutFormElement.style.display = 'block';
    emptyMessageElement.style.display = 'none';

    // Render daftar item
    cartItemsElement.innerHTML = cart.map(item => {
        const subTotal = item.price * item.quantity;
        totalPrice += subTotal;
        return `
            <div class="cart-item-card">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(subTotal)}</p>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Hapus</button>
            </div>
        `;
    }).join('');

    // Update total harga
    totalPriceElement.textContent = formatRupiah(totalPrice);

    // Tambahkan event listener untuk tombol "Hapus"
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
};

// Fungsi untuk membuat link WhatsApp (Checkout)
const setupWhatsAppCheckout = () => {
    const form = document.getElementById('order-details-form');
    if (!form) return; // Stop jika bukan di cart.html

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const buyerName = document.getElementById('buyer-name').value;
        const playerId = document.getElementById('player-id').value;
        const cart = getCart();
        let totalPrice = 0;
        
        // Buat detail pesanan
        let orderDetails = "Halo 🌸SYPA STORE🌸, saya ingin memesan produk berikut:\n\n";
        orderDetails += `*Nama Pembeli:* ${buyerName}\n`;
        orderDetails += `*ID Player FF:* ${playerId}\n\n`;
        orderDetails += `*Detail Pesanan:*\n`;

        cart.forEach((item, index) => {
            const subTotal = item.price * item.quantity;
            totalPrice += subTotal;
            orderDetails += `${index + 1}. ${item.name} (${item.quantity}x) - ${formatRupiah(subTotal)}\n`;
        });

        orderDetails += `\n*TOTAL HARGA: ${formatRupiah(totalPrice)}*\n\n`;
        orderDetails += "Mohon diproses, terima kasih!";

        // Encode detail pesanan untuk URL WhatsApp
        const encodedMessage = encodeURIComponent(orderDetails);

        // Buat link WhatsApp
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Buka link WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Opsional: Hapus keranjang setelah checkout
        // saveCart([]); 
        // alert("Pesanan Anda telah dikirim ke WhatsApp. Silakan lanjutkan transaksi.");
        // window.location.href = 'index.html'; 
    });
};

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Inisialisasi hitungan keranjang di semua halaman

    if (document.getElementById('membership-list')) {
        renderProducts(); // Render produk jika di index.html
    }
    
    if (document.getElementById('cart-items')) {
        renderCart(); // Render keranjang jika di cart.html
        setupWhatsAppCheckout(); // Setup checkout jika di cart.html
    }
});