var cartContainer = document.getElementById("cartItems");
var totalPriceContainer = document.getElementById("totalPrice");
var cart = JSON.parse(localStorage.getItem("cart") || "[]");
displayCartItems();
function displayCartItems() {
  cartContainer.innerHTML = "";
  var totalPrice = 0;
  cart.forEach(function (item) {
    var cartItemDiv = document.createElement("div");
    cartItemDiv.className = "bg-white p-4 shadow-lg";
    cartItemDiv.innerHTML = '\n          <img src="'
      .concat(item.thumbnail, '" alt="')
      .concat(
        item.title,
        '" class="w-full h-32 object-contain mb-2">\n          <h2 class="text-lg">'
      )
      .concat(item.title, '</h2>\n          <p class="text-gray-600">Price: ')
      .concat(
        item.price,
        ' USD</p>\n          <p class="text-gray-600">Quantity: '
      )
      .concat(item.quantity, '</p>\n          <p class="text-gray-600">Total: ')
      .concat(
        (item.price * item.quantity).toFixed(2),
        ' USD</p>\n          <div class="flex items-center mt-2">\n            <button onclick="updateCartQuantity('
      )
      .concat(
        item.id,
        ', -1)" class="bg-gray-500 text-white px-3 pb-0.5 py-auto rounded-full mr-4 text-xl">-</button>\n            <button onclick="updateCartQuantity('
      )
      .concat(
        item.id,
        ', 1)" class="bg-gray-500 text-white px-2 pb-0.5 rounded-full mr-auto text-xl">+</button>\n            <button onclick="removeFromCart('
      )
      .concat(
        item.id,
        ')" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>\n          </div>\n        '
      );
    cartContainer.appendChild(cartItemDiv);
    totalPrice += item.price * item.quantity;
  });
  totalPriceContainer.textContent = totalPrice.toFixed(2);
}
function updateCartQuantity(productId, change) {
  var cartItem = cart.find(function (item) {
    return item.id === productId;
  });
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      cart = cart.filter(function (item) {
        return item.id !== productId;
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }
}
function removeFromCart(productId) {
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}
