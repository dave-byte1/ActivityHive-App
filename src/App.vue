<script setup>

import {computed, reactive} from "vue";

// Reactive object to store app data
const data = reactive({
  sitename: "ActivityHive",
  products: [],
  cart: [],
  isCheckoutVisible: false,
  currentFilter: "all",
  isCartVisible: false,
  customerName: "",
  customerPhone: "",
});

// Fetch products from the back-end
function fetchProducts() {
  fetch('http://localhost:3000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((products) => {
        data.products = products;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

// Fetch products when the component is mounted
fetchProducts();


// Function to open checkout
function goToCheckout() {
  data.isCheckoutVisible = true;
}

// Function to close checkout
function goToCart() {
  data.isCheckoutVisible = false;
}

// Add item to the cart
function addItem(product) {
  data.cart.push(product.id);
}

// Remove an item from the cart
function removeItem(productId) {
  const index = data.cart.indexOf(productId);
  if (index !== -1) {
    data.cart.splice(index, 1);
  }
}

// Computed property for the number of items in the cart
const cartItemCount = computed(() => {
  return data.cart.length || "";
});

// Function to check if an item can be added to the cart
function canAddToCart(product) {
  const productInCart = data.cart.filter((id) => id === product.id).length;
  return product.spaces > productInCart;
}

// Computed property to disable the cart button if cart is empty
const disableCart = computed(() => {
  return data.cart.length === 0;
});

// Computed property for filtered products
const filteredProducts = computed(() => {
  if (data.currentFilter === "all") {
    return data.products;
  }
  return data.products.filter((product) => product.filter === data.currentFilter);
});

// Computed property to show cart items
const cartItems = computed(() => {
  return data.products.filter((product) => data.cart.includes(product.id));
})

// Toggle visibility of the cart
function toggleCart() {
  data.isCartVisible = !data.isCartVisible;
}

function toggleShop() {
  if (data.isCartVisible) {
    data.isCartVisible = false; // Hide the cart and show the shop
  }
}

// Group cart items by product and calculate their quantities
const groupedCartItems = computed(() => {
  const grouped = {};
  data.cart.forEach((id) => {
    if (!grouped[id]) {
      grouped[id] = {...data.products.find((product) => product.id === id), quantity: 0};
    }
    grouped[id].quantity++;
  });
  return Object.values(grouped);
});

// Compute the total price of the cart
const totalCartPrice = computed(() => {
  return groupedCartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});


</script>

<template>
  <div class="bg-[#F5F5F5] min-h-screen">

    <!-- Header -->
    <header class="bg-[#4d4d4d] text-white px-4 py-3 flex items-center justify-between">
      <div class="text-xl font-bold">
        {{ data.sitename }}
      </div>
      <div class="flex justify-center w-full space-x-4">
        <button
            @click="toggleShop"
            class="bg-white text-[#4d4d4d] px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Shop
        </button>
        <button
            :disabled="disableCart"
            @click="toggleCart"
            class="bg-white text-[#4d4d4d] px-4 py-2 rounded shadow hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Cart ({{ cartItemCount }})
        </button>
      </div>
    </header>

    <!-- Product List -->
    <div v-if="!data.isCartVisible" class="container mx-auto py-10">
      <h2 class="text-center text-2xl font-bold mb-6">Available Classes</h2>

      <!-- Filter Buttons -->
      <div class="flex justify-center space-x-4 mb-6">
        <button
            @click="data.currentFilter = 'all'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'all',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'all'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          All
        </button>
        <button
            @click="data.currentFilter = 'math'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'math',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'math'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Math
        </button>
        <button
            @click="data.currentFilter = 'science'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'science',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'science'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Science
        </button>
        <button
            @click="data.currentFilter = 'art'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'art',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'art'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Art
        </button>
        <button
            @click="data.currentFilter = 'writing'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'writing',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'writing'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Writing
        </button>
        <button
            @click="data.currentFilter = 'photography'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'photography',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'photography'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Photography
        </button>
        <button
            @click="data.currentFilter = 'dance'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'dance',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'dance'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Dance
        </button>
        <button
            @click="data.currentFilter = 'chess'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'chess',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'chess'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Chess
        </button>
        <button
            @click="data.currentFilter = 'drama'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'drama',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'drama'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Drama
        </button>
        <button
            @click="data.currentFilter = 'history'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'history',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'history'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          History
        </button>
        <button
            @click="data.currentFilter = 'coding'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'coding',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'coding'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Coding
        </button>
        <button
            @click="data.currentFilter = 'fitness'"
            :class="{
            'bg-[#4d4d4d] text-white': data.currentFilter === 'fitness',
            'bg-white text-[#4d4d4d]': data.currentFilter !== 'fitness'
          }"
            class="px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Fitness
        </button>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white p-6 rounded shadow-md"
        >
          <h3 class="text-lg font-bold mb-2">{{ product.subject }}</h3>
          <p class="mb-2">Location: {{ product.location }}</p>
          <p class="mb-2">Price: £{{ product.price }}</p>
          <p class="mb-4">Spaces available: {{ product.spaces }}</p>
          <button
              :disabled="!canAddToCart(product)"
              @click="addItem(product)"
              class="px-4 py-2 rounded bg-[#4d4d4d] text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Cart List -->
    <div v-else class="container mx-auto py-10">
      <h2 class="text-center text-2xl font-bold mb-6">Your Cart</h2>

      <!-- Display grouped cart items -->
      <div v-if="groupedCartItems.length > 0">
        <div
            v-for="item in groupedCartItems"
            :key="item.id"
            class="bg-white p-6 rounded shadow-md mb-4 flex justify-between items-center"
        >
          <div>
            <h3 class="text-lg font-bold mb-2">{{ item.subject }}</h3>
            <p class="mb-2">Location: {{ item.location }}</p>
            <p>Price: £{{ item.price }}</p>
            <p>Quantity: {{ item.quantity }}</p>
          </div>
          <button
              @click="removeItem(item.id)"
              class="flex items-center gap-2 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Remove
            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Total Price -->
        <div class="text-right font-bold text-xl mt-6">
          Total: £{{ totalCartPrice }}
        </div>

        <div class="text-right font-bold text-xl mt-6">
          <!-- Checkout Button -->
          <button
              v-if="!data.isCheckoutVisible"
              @click="goToCheckout"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2"
          >
            Checkout
            <svg class="w-3.5 h-3.5 align-middle ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>

          <!-- Back to Cart Button -->
          <button
              v-if="data.isCheckoutVisible"
              @click="goToCart"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5 transform rotate-180 align-middle" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            Back to Cart
          </button>
        </div>


        <div v-if="data.isCheckoutVisible" class="container mx-auto py-10">
          <h2 class="text-center text-2xl font-bold mb-6">Checkout</h2>

          <form class="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
            <div class="mb-4">
              <label for="name" class="block text-sm font-bold mb-2">Name</label>
              <input
                  id="name"
                  v-model="data.customerName"
                  type="text"
                  pattern="[A-Za-z ]+"
                  placeholder="Enter your name"
                  class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
              />
            </div>

            <div class="mb-4">
              <label for="phone" class="block text-sm font-bold mb-2">Phone Number</label>
              <input
                  id="phone"
                  v-model="data.customerPhone"
                  type="text"
                  pattern="[0-9]+"
                  placeholder="Enter your phone number"
                  class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
              />
            </div>

            <div class="text-right font-bold text-xl mt-6">
              Total: £{{ totalCartPrice }}
            </div>

            <div class="text-right text-gray-500 italic">
              Payment will be done in person
            </div>

            <button
                type="submit"
                class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        Your cart is empty.
      </div>
    </div>
  </div>

</template>

<style>

</style>