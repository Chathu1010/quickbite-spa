<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ProductCard from './components/ProductCard.vue'
import CartDrawer from './components/CartDrawer.vue'
import OrderSuccess from './components/OrderSuccess.vue' // Step 2: Import Success Screen
import { useProducts } from './composables/useProducts'

const { products, loading, fetchProducts } = useProducts()
fetchProducts()

// State management
const isCartOpen = ref(false)
const showSuccess = ref(false) // Step 2: State to control success screen visibility
</script>

<template>
  <div class="min-h-screen bg-[#0b0b0b] text-white">
    <NavBar @open-cart="isCartOpen = true" /> 
    
    <main class="max-w-7xl mx-auto px-8 py-12">
      <header class="mb-12">
        <h1 class="text-4xl font-bold text-white mb-2">Delicious food, delivered fast</h1>
        <p class="text-gray-400">Order your favorite meals from the best restaurants near you.</p>
      </header>

      <div v-if="loading" class="text-center py-20 text-orange-500 font-bold">
        Loading QuickBite Menu...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="item in products" 
          :key="item.id" 
          :product="item" 
        />
      </div>
    </main>

    <OrderSuccess v-if="showSuccess" @go-home="showSuccess = false" />

    <CartDrawer 
      :isOpen="isCartOpen" 
      @close="isCartOpen = false" 
      @order-complete="showSuccess = true" 
    />
  </div>
</template>