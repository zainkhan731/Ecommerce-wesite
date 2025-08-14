const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});



let showProducts = document.querySelector(".products");
const productsData = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 59.99,
        image: "./img/Wireless_Headphones.jpg",
        category: "electronics",
    },
    {
        id: 2,
        title: "Bluetooth Speaker",
        price: 29.99,
        image: "./img/Bluetooth_Speaker.jpg",
        category: "electronics",
    },
    {
        id: 3,
        title: "Gaming Laptop",
        price: 999.99,
        image: "./img/Gaming_Laptop.jpg",
        category: "electronics",
    },
    {
        id: 4,
        title: "Smartphone Pro X",
        price: 799.99,
        image: "./img/Smartphone_Pro_X.jpg",
        category: "electronics",
    },
    {
        id: 5,
        title: "4K Smart TV",
        price: 1199.99,
        image: "./img/4K_Smart_TV.jpg",
        category: "electronics",
    },
    {
        id: 6,
        title: "Smartwatch Series 5",
        price: 199.99,
        image: "./img/Smartwatch_Series_5.jpg",
        category: "electronics",
    },
    {
        id: 7,
        title: "Wireless Gaming Mouse",
        price: 49.99,
        image: "./img/Wireless_Gaming_Mouse.jpg",
        category: "electronics",
    },
    {
        id: 8,
        title: "Mechanical Keyboard RGB",
        price: 89.99,
        image: "./img/Mechanical_Keyboard_RGB.jpg",
        category: "electronics",
    },
    {
        id: 9,
        title: "Noise Cancelling Earbuds",
        price: 69.99,
        image: "./img/Noise_Cancelling_Earbuds.jpg",
        category: "electronics",
    },
    {
        id: 10,
        title: "Portable Power Bank 20000mAh",
        price: 39.99,
        image: "./img/Portable_Power.jpg",
        category: "electronics",
    },
];

productsData.forEach((curElm) => {
    const card = document.createElement("div");

    // Container ko grid classes do sirf ek baar
    showProducts.classList.add(
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-4",
        "gap-6",
        "p-6"
    );

    card.innerHTML = `
    <img src="${curElm.image}" alt="${curElm.title}" 
      class="w-full h-48 sm:h-64 object-cover" />
    <div class="p-4 flex flex-col flex-grow">
      <h2 class="text-xl font-semibold mb-2">${curElm.title}</h2>
      <div class="flex justify-between items-center mb-4">
        <p class="text-gray-700 text-lg">$${curElm.price.toFixed(2)}</p>
        <p class="text-gray-700 totalPrice">Total: $0.00</p>
      </div>
      <div class="flex flex-wrap justify-between gap-4 mt-auto">
        <button class="addToCartBtn bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
          Add to Cart
        </button>
        <div class="flex items-center gap-2">
          <button class="px-4 py-1 text-2xl increaseBtn rounded border border-gray-300 hover:bg-gray-100 transition">+</button>
          <span class="px-4 py-1 text-xl quantityValue">0</span>
          <button class="px-4 py-1 text-2xl decreaseBtn rounded border border-gray-300 hover:bg-gray-100 transition">-</button>
        </div>
      </div>
    </div>
  `;

    showProducts.appendChild(card);

    const increaseBtn = card.querySelector(".increaseBtn");
    const decreaseBtn = card.querySelector(".decreaseBtn");
    const quantityValue = card.querySelector(".quantityValue");
    const totalPrice = card.querySelector(".totalPrice");
    const addToCartBtn = card.querySelector(".addToCartBtn");  // Note the dot (class selector)

    let count = 0;

    increaseBtn.addEventListener("click", () => {
        if (count < 10) {
            count++;
            quantityValue.textContent = count;
            totalPrice.textContent = `Total: $${(count * curElm.price).toFixed(2)}`;
        }
    });

    decreaseBtn.addEventListener("click", () => {
        if (count > 0) {
            count--;
            quantityValue.textContent = count;
            totalPrice.textContent = `Total: $${(count * curElm.price).toFixed(2)}`;
        }
    });

    addToCartBtn.addEventListener("click", () => {
        if (count === 0) {
            alert("Please add any quantity before adding to cart.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const productIndex = cart.findIndex((item) => {
            return item.id === curElm.id
        });
        console.log(productIndex);

        if (productIndex !== -1) {
            cart[productIndex].quantity += count;
        } else {
            cart.push({
                id: curElm.id,
                title: curElm.title,
                price: curElm.price,
                quantity: count,
                image: `../img/${curElm.image.split("/").pop()}`// Yahan ../img laga kar relative path fix kar diya
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();
        alert(`${curElm.title} added to cart!`);

        count = 0;
        quantityValue.textContent = count;
        totalPrice.textContent = `Total: $0.00`;
    });

});

const badge = document.querySelectorAll(".cartValue");

const updateCartBadge = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalCount = 0;
    for (let item of cart) {
        totalCount += item.quantity;
    }

    badge.forEach((span) => {
        span.textContent = totalCount;
    });
}

// Page load pe badge update karo
updateCartBadge();