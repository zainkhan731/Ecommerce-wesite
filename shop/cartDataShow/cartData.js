const cartItemsDiv = document.getElementById("cart-items");
const cartTotalDiv = document.getElementById("cart-total");

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Update Badge
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cartValue").forEach(span => span.textContent = totalCount);

  // Update Cart UI design
  cartItemsDiv.innerHTML = "";
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p class="text-center text-gray-700">Your cart is empty.</p>';
    cartTotalDiv.textContent = "";
    return;
  }

  let totalGrand = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalGrand += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex items-center gap-4 bg-white p-4 rounded shadow mb-4";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-cover rounded"/>
      <div class="flex-grow">
        <h3 class="text-lg font-semibold">${item.title}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${itemTotal.toFixed(2)}</p>
        <button class="remove-btn bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);

    // Remove Item
    const removeBtn = itemDiv.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      const updatedCart = cart.filter(ci => ci.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCart();
    });
  });

  cartTotalDiv.textContent = `Grand Total: $${totalGrand.toFixed(2)}`;
  cartTotalDiv.className = "text-right font-bold text-xl mt-6";
}

// Page load pe cart update
updateCart();