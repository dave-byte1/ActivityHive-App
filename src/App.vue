<script setup>

import {computed, reactive} from "vue";

// Reactive object to store app data
const data = reactive({
  sitename: "ActivityHive",
  product: { // Product information
    id: 1001,
    subject: "Extra Math Lesson",
    location: "London, MH10 WN",
    price: 10,
    spaces: 8,
  },
  cart: [], // Array to store items in shopping cart
  isCheckoutVisible: false
});

function addItem() {
  data.cart.push(data.product.id);
}

const cartItemCount = computed(() => {
  return data.cart.length || "";
});

const canAddToCart = computed(() => {
  return data.product.spaces > data.cart.length;
});

</script>

<template>

  <div class="bg-[#F5F5F5] min-h-screen">
    <header class="bg-[#4d4d4d] text-white px-4 py-3 flex items-center justify-between">
      <!-- Title -->
      <div class="text-xl font-bold">
        ActivityHive
      </div>

      <!-- Buttons -->
      <div class="flex justify-center w-full space-x-4">
        <button class="bg-white text-[#4d4d4d] px-4 py-2 rounded shadow hover:bg-gray-100 transition">
          Shop
        </button>
        <button class="bg-white text-[#4d4d4d] px-4 py-2 rounded shadow hover:bg-gray-100 transition">
          Cart
        </button>
      </div>
    </header>


  </div>

</template>

<style>

</style>