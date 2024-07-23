const apiUrl = "https://dummyjson.com/products";
const productsContainer = document.getElementById("products") as HTMLElement;
const productDetailsContainer = document.getElementById(
  "productDetails"
) as HTMLElement;
const cartContainer = document.getElementById("cartItems") as HTMLElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const filterType = document.getElementById("filterType") as HTMLSelectElement;
const sortPrice = document.getElementById("sortPrice") as HTMLSelectElement;
const toggleCartButton = document.getElementById(
  "toggleCart"
) as HTMLButtonElement;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface CartItem extends Product {
  quantity: number;
}

type Products = Product[];
type Cart = CartItem[];

let products: Products = [];
let cart: Cart = JSON.parse(localStorage.getItem("cart") || "[]");

fetchProducts();

async function fetchProducts(): Promise<void> {
  const response = await fetch(apiUrl);
  const data = await response.json();
  products = data.products;
  displayProducts(products);
  populateFilterOptions();
  updateCartDisplay();
}

function displayProducts(products: Products): void {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "bg-white p-4 shadow-lg cursor-pointer";
    productDiv.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-48 object-contain mb-2">
        <h2 class="text-lg">${product.title}</h2>
        <p class="text-gray-600">${product.price} USD</p>
      `;
    productDiv.addEventListener("click", () => showProductDetails(product));
    productsContainer.appendChild(productDiv);
  });
}

function showProductDetails(product: Product): void {
  productDetailsContainer.innerHTML = `
      <div class="bg-white p-4 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2">
        <button class="absolute top-2 right-2 text-gray-600 text-xl font-bold" onclick="hideProductDetails()">Close</button>
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-72 object-contain mb-4">
        <h2 class="text-2xl mb-2">${product.title}</h2>
        <p class="text-gray-800 mb-2">${product.description}</p>
        <p class="text-lg mb-2">Category: ${product.category}</p>
        <p class="text-lg mb-2">Discount: ${product.discountPercentage}%</p>
        <p class="text-lg mb-2">Rating: ${product.rating}</p>
        <p class="text-xl mb-4 font-bold">${product.price} USD</p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  productDetailsContainer.classList.remove("hidden");
}

function hideProductDetails(): void {
  productDetailsContainer.classList.add("hidden");
}

function addToCart(productId: number): void {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay(): void {
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "flex justify-between items-center mb-2";
    cartItemDiv.innerHTML = `
        <span>${item.title} (${item.quantity})</span>
        <div>
          <button class="text-2xl mx-2" onclick="updateCartQuantity(${item.id}, -1)">-</button>
          <button class="text-2xl" onclick="updateCartQuantity(${item.id}, 1)">+</button>
          <button class="text-lg" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    cartContainer.appendChild(cartItemDiv);
  });
}

function updateCartQuantity(productId: number, change: number): void {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }
}

function removeFromCart(productId: number): void {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

toggleCartButton.addEventListener("click", function () {
  const isCartVisible = cartContainer.style.display !== "none";
  cartContainer.style.display = isCartVisible ? "none" : "block";
});

function filter(): void {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  const selectedType = filterType.value;
  filteredProducts = selectedType
    ? filteredProducts.filter((product) => product.category === selectedType)
    : filteredProducts;

  filteredProducts = [...filteredProducts].sort((a, b) =>
    sortPrice.value === "asc" ? a.price - b.price : b.price - a.price
  );

  displayProducts(filteredProducts);
}

function populateFilterOptions(): void {
  const categoriesSet: Set<string> = new Set();

  products.forEach((product) => {
    if (product && product.category) {
      categoriesSet.add(product.category);
    }
  });

  const uniqueCategories: string[] = Array.from(categoriesSet);
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    filterType.appendChild(option);
  });
}
