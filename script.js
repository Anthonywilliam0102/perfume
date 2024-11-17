let cartCount = 0;
let cartItems = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cartCounter = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const productModal = document.getElementById('product-modal');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const closeCart = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceDisplay = document.getElementById('total-price');
    const addToCartModalButton = document.querySelector('.add-to-cart-modal');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search');
    const products = document.querySelectorAll('.product');
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    
    // Alternar modo escuro
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Adicionar produto ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.replace('R$', '').trim());
            
            // Verificar se o produto já está no carrinho
            let existingProduct = cartItems.find(item => item.name === productName);
            if (existingProduct) {
                // Se já estiver, aumente a quantidade
                existingProduct.quantity++;
                totalPrice += productPrice;
            } else {
                // Se não estiver, adicione ao carrinho
                cartCount++;
                cartItems.push({ name: productName, price: productPrice, quantity: 1 });
                totalPrice += productPrice;
            }
            
            cartCounter.textContent = cartCount;
            updateCartModal();
            
            alert(`${productName} adicionado ao carrinho!`);
        });
    });

    // Exibir modal de carrinho
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    // Fechar modal de carrinho
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Fechar modal de produto
    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Finalizar compra
    checkoutBtn.addEventListener('click', () => {
        alert('Compra finalizada!');
        cartCount = 0;
        cartItems = [];
        totalPrice = 0;
        updateCartModal();
        cartModal.style.display = 'none';
    });

    // Filtro de categorias
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Filtro por pesquisa
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Atualizar modal de carrinho
    function updateCartModal() {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
            
            // Adicionar botões de aumentar e diminuir a quantidade
            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                totalPrice += item.price;
                cartCount++;
                updateCartModal();
            });
            
            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    totalPrice -= item.price;
                    cartCount--;
                    updateCartModal();
                }
            });

            // Adicionar botão de remover o item
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remover';
            removeBtn.addEventListener('click', () => {
                removeItemFromCart(item.name);
            });

            li.appendChild(increaseBtn);
            li.appendChild(decreaseBtn);
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
        });

        totalPriceDisplay.textContent = `R$ ${totalPrice.toFixed(2)}`;
    }

    // Função para remover item do carrinho
    function removeItemFromCart(itemName) {
        // Remover item do carrinho
        cartItems = cartItems.filter(item => item.name !== itemName);
        
        // Atualizar contagem e preço total
        cartCount = cartItems.length;
        totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        cartCounter.textContent = cartCount;
        updateCartModal();
    }
});
