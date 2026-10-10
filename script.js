// Cart State
let cart = [];

// Format currency in Uzbek Sum
function formatSum(num) {
    return num.toLocaleString('en-US').replace(/,/g, ' ') + " so'm";
}

// Add item to cart
function addToCart(name, price, category) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            category: category,
            quantity: 1
        });
    }
    
    updateCartUI();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart HTML and Total
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.textContent = `${cart.length} ta xizmat`;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="py-8 text-center text-slate-400 text-sm">Savatchangiz hozircha bo'sh. Yuqoridagi xizmatlardan tanlang!</p>`;
        cartTotal.textContent = "0 so'm";
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="py-4 flex items-center justify-between gap-4">
                <div>
                    <h4 class="font-semibold text-sm text-white">${item.name}</h4>
                    <span class="text-xs text-rose-400">${item.category} • ${formatSum(item.price)}</span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-sm font-bold text-slate-300">${item.quantity} ta</span>
                    <button onclick="removeFromCart(${index})" class="w-8 h-8 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    cartTotal.textContent = formatSum(total);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Iltimos, avval savatchaga xizmatlardan qo'shing!");
        return;
    }
    
    const modal = document.getElementById('success-modal');
    modal.classList.remove('hidden');
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    cart = [];
    updateCartUI();
}