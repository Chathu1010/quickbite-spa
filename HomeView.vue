<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, fetchProducts } = useProducts()
fetchProducts()

// 1. Search Query State
const searchQuery = ref('')

// 2. Search Logic: Filters by Title or Category
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product => 
    product.title.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  )
})

// Optional: Clear search function
const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-8 py-12">
    <header class="mb-16 relative overflow-hidden rounded-[2rem] bg-zinc-900/40 p-8 md:p-12 border border-zinc-800">
      <div class="relative z-10 max-w-xl">
        <div class="flex items-center space-x-2 text-orange-500 mb-6 text-[10px] font-black uppercase tracking-[0.2em]">
           <span class="bg-orange-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-black">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
               <path d="M11.983 1.907a.75.75 0 00-1.292-.614l-5.64 6.16a.75.75 0 00.105 1.09l3.526 2.87-3.526 2.87a.75.75 0 00-.105 1.09l5.64 6.16a.75.75 0 001.292-.614l-1.535-6.427H16a.75.75 0 00.53-1.28l-4.547-4.316 1.535-6.427z" />
             </svg>
           </span>
           <span>Fast Delivery</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
          Delicious food,<br/>
          <span class="text-orange-500">delivered fast</span>
        </h1>
        
        <p class="text-zinc-400 mb-10 text-lg leading-relaxed">
          Order your favorite meals from the best restaurants near you.
        </p>

        <div class="flex items-center bg-white rounded-2xl overflow-hidden p-1.5 shadow-2xl shadow-orange-500/20 max-w-lg">
          <div class="pl-4 text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search for food or restaurants..." 
            class="flex-1 px-4 py-3 text-black font-medium focus:outline-none placeholder:text-zinc-400 text-sm"
          />
          <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-black transition-all active:scale-95 text-sm">
            Search
          </button>
        </div>
      </div>

      <div class="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-80">
        <div class="w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </header>

    <div class="flex items-end justify-between mb-10">
       <div>
         <h2 class="text-3xl font-black text-white tracking-tight">Popular Categories</h2>
         <p class="text-zinc-500 text-sm mt-1">Showing {{ filteredProducts.length }} items</p>
       </div>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-zinc-400 font-bold uppercase tracking-widest text-xs">Fetching Menu...</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-center py-32 bg-zinc-900/20 rounded-[2rem] border border-dashed border-zinc-800">
       <p class="text-zinc-500 text-xl font-bold">No matches for "{{ searchQuery }}"</p>
       <button @click="clearSearch" class="text-orange-500 font-bold hover:underline mt-4 uppercase text-xs tracking-widest">
         Clear Search
       </button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <ProductCard 
        v-for="item in filteredProducts" 
        :key="item.id" 
        :product="item" 
      />
    </div>
  </div>
</template>