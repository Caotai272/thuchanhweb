// Danh sách sản phẩm xe máy
const products = [
    { id: 1, name: "Honda Wave Alpha", price: 18000000, image: "images/product1.jpg" },
    { id: 2, name: "Yamaha Sirius", price: 21000000, image: "images/product2.jpg" },
    { id: 3, name: "Honda Vision", price: 32000000, image: "images/product3.jpg" },
    { id: 4, name: "Yamaha Jupiter", price: 29000000, image: "images/product4.jpg" },
    { id: 5, name: "Honda Air Blade", price: 42000000, image: "images/product5.jpg" },
    { id: 6, name: "Suzuki Raider", price: 48000000, image: "images/product6.jpg" },
    { id: 7, name: "Honda Winner X", price: 46000000, image: "images/product7.jpg" },
    { id: 8, name: "Yamaha Exciter", price: 47000000, image: "images/product8.jpg" },
    { id: 9, name: "Honda PCX", price: 58000000, image: "images/product9.jpg" },
    { id: 10, name: "Yamaha NVX", price: 53000000, image: "images/product10.jpg" }
];

// Giỏ hàng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hiển thị tất cả sản phẩm (cho products.html)
function displayProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <button class="btn" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}

// Hiển thị sản phẩm nổi bật (cho index.html)
function displayFeaturedProducts() {
    const featuredProductList = document.getElementById('featured-product-list');
    if (featuredProductList) {
        featuredProductList.innerHTML = '';
        const featuredProducts = products.slice(0, 4);
        featuredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <button class="btn" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            `;
            featuredProductList.appendChild(productDiv);
        });
    }
}

// Thêm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    displayCart();
}

// Hiển thị giỏ hàng
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                <span>${item.name}</span>
                <span>${item.quantity}</span>
                <span>${itemTotal.toLocaleString('vi-VN')} VNĐ</span>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
            `;
            cartItems.appendChild(cartItem);
        });
        cartTotal.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
    }
}

// Xóa khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã xóa sản phẩm khỏi giỏ hàng!');
    displayCart();
}

// Thanh toán
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    alert('Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được ghi nhận.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Xử lý form liên hệ
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Cảm ơn ${name} đã liên hệ! Chúng tôi sẽ phản hồi sớm.`);
    e.target.reset();
});

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayFeaturedProducts();
    displayCart();
});