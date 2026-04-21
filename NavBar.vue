<script setup lang="ts">
import { useCart } from '../composables/useCart'

// Access the global cart count
const { cartCount } = useCart()

// Define the signal this component sends to the App.vue parent
defineEmits(['open-cart'])
</script>

<template>
  <nav class="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <span class="text-black font-black">Q</span>
        </div>
        <span class="text-xl font-bold tracking-tighter text-white">QuickBite</span>
      </div>

      <div class="flex items-center space-x-4">
        
        <button 
          @click="$emit('open-cart')" 
          class="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all active:scale-95"
          title="Open Cart"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-6 h-6"
            >
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
 

          <span 
            v-if="cartCount > 0"
            class="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-black"
          >
            {{ cartCount }}
          </span>
        </button>

        <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-400">
          U
        </div>
      </div>
    </div>
  </nav>
</template>