// JS for Toggle 
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// Cards data
const cardsData = [
    {
        imgSrc: "./imgs/card1.jpg",
        title: "Mic and speaker",
        description: "One of the best mic and speaker for your needs.",
        price: "$19.99",
        link: "./shop/shop.html"
    },
    {
        imgSrc: "./imgs/card2.jpg",
        title: "mic and headphone",
        description: "Use this mic and headphone for your gaming needs.",
        price: "$29.99",
        link: "./shop/shop.html"
    },
    {
        imgSrc: "./imgs/card3.jpg",
        title: "Mackbook",
        description: "The best laptop for your needs. with some more features.",
        price: "$39.99",
        link: "./shop/shop.html"
    },
    {
        imgSrc: "./imgs/card4.jpg",
        title: "Camera",
        description: "Capture your moments with this high-quality camera.",
        price: "$49.99",
        link: "./shop/shop.html"
    },
];

// Show cards
const cardsContainer = document.getElementById("cards");
const heading = document.createElement("h2");
heading.textContent = "Electronics";
heading.classList.add("text-2xl", "font-bold", "my-10", "text-center", "text-white");
cardsContainer.parentNode.insertBefore(heading, cardsContainer);


cardsData.forEach(curElm => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "bg-gray-800", "p-4", "rounded-lg");

    cardElement.innerHTML = `
        <img src="${curElm.imgSrc}" alt="${curElm.title}" class="w-full h-32 object-cover mb-4 rounded">
        <h2 class="text-lg font-bold mb-2">${curElm.title}</h2>
        <p>${curElm.description}</p>
        <p class="price">${curElm.price}</p>
        <button class="shop-now-btn mt-2 bg-orange-400 text-white py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">Shop Now</button>`;
    cardsContainer.appendChild(cardElement);

    // Ab yahan button ko click event do jo link open kare
    const btn = cardElement.querySelector('.shop-now-btn');
    btn.addEventListener('click', () => {
        window.open(curElm.link, '_blank'); 
    });

});



// Product search system
const productShowData = document.querySelector(".productShowData");
const searchInput = document.querySelector('#searchInput');
const searchIcon = document.querySelector('.fa-magnifying-glass');
let allProducts = []; // allproduct ko humne globle variable banya joky filter kerny k lcurElm

// Load products from API
async function loadProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products?limit=50');
        const data = await res.json();
        allProducts = data.products || []; // allProducts ko api wala data esmy store kiya 
        displayProducts(allProducts);
        // console.log(allProducts)
    } catch (e) {
        console.error(e);
        productShowData.innerHTML = '<div class="p-4 text-red-400">Failed to load products.</div>';
    }
}

// Display products
function displayProducts(products) {
    productShowData.innerHTML = '';
    if (!products.length) {
        productShowData.innerHTML = '<div class="p-8 text-center text-gray-500">No products found.</div>';
        return;
    }
    products.forEach(curElm => {
        const img = (curElm.images && curElm.images[0]) ? curElm.images[0] : `zainkhan // showImages`;
        productShowData.innerHTML += `
            <div class="product-card p-4 border rounded mb-4">
                <img src="${img}" class="w-full h-40 object-cover rounded mb-2" />
                <h3 class="font-semibold">${curElm.title}</h3>
                <p class="text-sm text-gray-600">${(curElm.description).slice(0, 70)}</p>
                <p class="font-bold mt-1">$${curElm.price}</p>
            </div>`;
    });
}

// SearchInput functionality
function productSearchNow() {
    const taskValue = searchInput.value.trim().toLowerCase();
    if (!taskValue) {
        displayProducts(allProducts);
        // console.log(displayProducts)
        return;
    }
    const filteredValue = allProducts.filter(curElm =>
        (curElm.title).toLowerCase().includes(taskValue) ||
        (curElm.description).toLowerCase().includes(taskValue) ||
        (curElm.category).toLowerCase().includes(taskValue)
    );
    displayProducts(filteredValue);
}

searchIcon.addEventListener("click", productSearchNow);
searchInput.addEventListener("input", (e) => {
    if (searchInput.value.trim() === "") {
        productSearchNow();
    }
});
// {
//     searchInput.addEventListener("input", () => {
//     if (searchInput.value.trim() === "") {
//         displayProducts(allProducts);
//     }
// });

// Debounce helper
// const debounceData = (fn, ms = 250) => {
//     let t;
//     //   return (...a) =>  { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }
//     return (...a) =>{
//         // console.log(fn)
//         clearTimeout(t);
//         t = setTimeout(() => fn(...a), ms)
//     };
// }
// // Events
// searchIcon.addEventListener('click', () =>{
//     productSearchNow();
// });
// // searchinput get 
// searchInput.addEventListener('input', debounceData(productSearchNow, 250));
// }


// Start

loadProducts();
// Product search system End

// mobil view search and add to cart 
const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileSearchBtn = document.getElementById('mobileSearchBtn');

mobileSearchBtn.addEventListener('click', () => {
    const query = mobileSearchInput.value.trim().toLowerCase();
    if (query === '') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        displayProducts(filtered);
    }
});

mobileSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') mobileSearchBtn.click();
});
