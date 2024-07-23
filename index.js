var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var apiUrl = "https://dummyjson.com/products";
var productsContainer = document.getElementById("products");
var productDetailsContainer = document.getElementById("productDetails");
var cartContainer = document.getElementById("cartItems");
var searchInput = document.getElementById("searchInput");
var filterType = document.getElementById("filterType");
var sortPrice = document.getElementById("sortPrice");
var toggleCartButton = document.getElementById("toggleCart");
var products = [];
var cart = JSON.parse(localStorage.getItem("cart") || "[]");
fetchProducts();
function fetchProducts() {
  return __awaiter(this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, fetch(apiUrl)];
        case 1:
          response = _a.sent();
          return [4 /*yield*/, response.json()];
        case 2:
          data = _a.sent();
          products = data.products;
          displayProducts(products);
          populateFilterOptions();
          updateCartDisplay();
          return [2 /*return*/];
      }
    });
  });
}
function displayProducts(products) {
  productsContainer.innerHTML = "";
  products.forEach(function (product) {
    var productDiv = document.createElement("div");
    productDiv.className = "bg-white p-4 shadow-lg cursor-pointer";
    productDiv.innerHTML = '\n        <img src="'
      .concat(product.thumbnail, '" alt="')
      .concat(
        product.title,
        '" class="w-full h-48 object-contain mb-2">\n        <h2 class="text-lg">'
      )
      .concat(product.title, '</h2>\n        <p class="text-gray-600">')
      .concat(product.price, " USD</p>\n      ");
    productDiv.addEventListener("click", function () {
      return showProductDetails(product);
    });
    productsContainer.appendChild(productDiv);
  });
}
function showProductDetails(product) {
  productDetailsContainer.innerHTML =
    '\n      <div class="bg-white p-4 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2">\n        <button class="absolute top-2 right-2 text-gray-600 text-xl font-bold" onclick="hideProductDetails()">Close</button>\n        <img src="'
      .concat(product.thumbnail, '" alt="')
      .concat(
        product.title,
        '" class="w-full h-72 object-contain mb-4">\n        <h2 class="text-2xl mb-2">'
      )
      .concat(product.title, '</h2>\n        <p class="text-gray-800 mb-2">')
      .concat(
        product.description,
        '</p>\n        <p class="text-lg mb-2">Category: '
      )
      .concat(
        product.category,
        '</p>\n        <p class="text-lg mb-2">Discount: '
      )
      .concat(
        product.discountPercentage,
        '%</p>\n        <p class="text-lg mb-2">Rating: '
      )
      .concat(
        product.rating,
        '</p>\n        <p class="text-xl mb-4 font-bold">'
      )
      .concat(
        product.price,
        ' USD</p>\n        <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="addToCart('
      )
      .concat(product.id, ')">Add to Cart</button>\n      </div>\n    ');
  productDetailsContainer.classList.remove("hidden");
}
function hideProductDetails() {
  productDetailsContainer.classList.add("hidden");
}
function addToCart(productId) {
  var product = products.find(function (p) {
    return p.id === productId;
  });
  if (!product) return;
  var cartItem = cart.find(function (item) {
    return item.id === productId;
  });
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push(__assign(__assign({}, product), { quantity: 1 }));
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}
function updateCartDisplay() {
  cartContainer.innerHTML = "";
  cart.forEach(function (item) {
    var cartItemDiv = document.createElement("div");
    cartItemDiv.className = "flex justify-between items-center mb-2";
    cartItemDiv.innerHTML = "\n        <span>"
      .concat(item.title, " (")
      .concat(
        item.quantity,
        ')</span>\n        <div>\n          <button class="text-2xl mx-2" onclick="updateCartQuantity('
      )
      .concat(
        item.id,
        ', -1)">-</button>\n          <button class="text-2xl" onclick="updateCartQuantity('
      )
      .concat(
        item.id,
        ', 1)">+</button>\n          <button class="text-lg" onclick="removeFromCart('
      )
      .concat(item.id, ')">Remove</button>\n        </div>\n      ');
    cartContainer.appendChild(cartItemDiv);
  });
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
    updateCartDisplay();
  }
}
function removeFromCart(productId) {
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}
toggleCartButton.addEventListener("click", function () {
  var isCartVisible = cartContainer.style.display !== "none";
  cartContainer.style.display = isCartVisible ? "none" : "block";
});
function filter() {
  var searchTerm = searchInput.value.toLowerCase();
  var filteredProducts = products.filter(function (product) {
    return product.title.toLowerCase().includes(searchTerm);
  });
  var selectedType = filterType.value;
  filteredProducts = selectedType
    ? filteredProducts.filter(function (product) {
        return product.category === selectedType;
      })
    : filteredProducts;
  filteredProducts = __spreadArray([], filteredProducts, true).sort(function (
    a,
    b
  ) {
    return sortPrice.value === "asc" ? a.price - b.price : b.price - a.price;
  });
  displayProducts(filteredProducts);
}
function populateFilterOptions() {
  var categoriesSet = new Set();
  products.forEach(function (product) {
    if (product && product.category) {
      categoriesSet.add(product.category);
    }
  });
  var uniqueCategories = Array.from(categoriesSet);
  uniqueCategories.forEach(function (category) {
    var option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    filterType.appendChild(option);
  });
}
