<script setup lang="ts">
import { useCart } from '../composables/useCart'
const { cartCount } = useCart()
</script>

<template>
  <nav class="flex items-center justify-between px-8 py-4 bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-50">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-black">Q</div>
      <span class="text-xl font-bold text-white tracking-tight">QuickBite</span>
    </div>

    <div class="flex-1 max-w-md mx-8 hidden md:block">
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search for your favorite food..." 
          class="w-full bg-[#2a2a2a] border border-gray-700 rounded-full py-2 px-6 focus:outline-none focus:border-orange-500 text-sm text-white"
        />
        <button class="absolute right-2 top-1 bg-orange-500 text-black px-4 py-1 rounded-full text-xs font-bold hover:bg-orange-400 transition">
          Search
        </button>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <button class="relative p-2 text-gray-400 hover:text-white transition">
        <span class="text-2xl">🛒</span>
        <span class="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-bold px-1.5 rounded-full">
            {{ cartCount }}
        </span>
      </button>
      <button class="bg-orange-500 text-black px-6 py-2 rounded-lg font-bold text-sm hover:scale-105 transition active:scale-95">
        Sign In
      </button>
    </div>
  </nav>
</template>