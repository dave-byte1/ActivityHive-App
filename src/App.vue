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
    },
    {
      id: 1002,
      subject: "Science Workshop",
      location: "Birmingham, B88 NJG",
      price: 15,
      spaces: 5,
    },
    {
      id: 1003,
      subject: "Art Class",
      location: "Manchester, MO9 PR1",
      price: 12,
      spaces: 10,
    },
  ],
  cart: [], // Array to store items in shopping cart
  isCheckoutVisible: false,
});

// Add item to the cart
function addItem(product) {
  data.cart.push(product.id);
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

const disableCart = computed(() => {
  return data.cart.length === 0; // Disable the Cart button if the cart is empty
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
        <button class="bg-white text-[#4d4d4d] px-4 py-2 rounded shadow hover:bg-gray-100 transition">
          Shop
        </button>
        <button
            :disabled="disableCart"
            class="bg-white text-[#4d4d4d] px-4 py-2 rounded shadow hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Cart ({{ cartItemCount }})
        </button>
      </div>
    </header>

    <!-- Product List -->
    <div class="container mx-auto py-10">
      <h2 class="text-center text-2xl font-bold mb-6">Available Classes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="product in data.products"
            :key="product.id"
            class="bg-white p-6 rounded shadow-md"
        >
          <h3 class="text-lg font-bold mb-2">{{ product.subject }}</h3>
          <p class="mb-2">Location: {{ product.location }}</p>
          <p class="mb-2">Price: ${{ product.price }}</p>
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
  </div>

</template>

<style>

</style>
