<script setup>

import {computed, reactive} from "vue";

// Reactive object to store app data
const data = reactive({
  sitename: "ActivityHive",
  products: [
    {
      id: 1001,
      subject: "Extra Math Lesson",
      location: "London, MH10 WN",
      price: 10,
      spaces: 8,
      filter: "math",
    },
    {
      id: 1002,
      subject: "Science Workshop",
      location: "Birmingham, B88 NJG",
      price: 15,
      spaces: 5,
      filter: "science",
    },
    {
      id: 1003,
      subject: "Art Class",
      location: "Manchester, MO9 PR1",
      price: 12,
      spaces: 10,
      filter: "art",
    },
  ],
  cart: [],
  isCheckoutVisible: false,
  currentFilter: "all",
  isCartVisible: false,
});

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

      <div v-if="cartItems.length > 0">
        <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white p-6 rounded shadow-md mb-4 flex justify-between items-center"
        >
          <div>
            <h3 class="text-lg font-bold mb-2">{{ item.subject }}</h3>
            <p class="mb-2">Location: {{ item.location }}</p>
            <p>Price: £{{ item.price }}</p>
          </div>
          <button
              @click="removeItem(item.id)"
              class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Remove
          </button>
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
