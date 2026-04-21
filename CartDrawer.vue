<script setup lang="ts">
import { useCart } from '../composables/useCart'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

// We pull all the tools we need from our cart toolbox
const { cart, cartTotal, addToCart, removeFromCart, clearCart } = useCart()

const handleCheckout = () => {
  if (cart.value.length === 0) return
  
  alert("🎉 Order Placed Successfully! Your food is on the way.")
  clearCart()
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="absolute inset-y-0 right-0 w-full max-w-md bg-zinc-900 shadow-2xl flex flex-col border-l border-zinc-800">
      
      <div class="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">Your Order</h2>
        <button @click="$emit('close')" class="text-zinc-400 hover:text-white text-3xl">&times;</button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <div v-if="cart.length === 0" class="text-center text-zinc-500 py-10">
          Your cart is empty!
        </div>
        
        <div v-for="item in cart" :key="item.id" class="flex items-center space-x-4 bg-zinc-800/50 p-3 rounded-xl border border-zinc-700">
          <img :src="item.thumbnail" class="w-16 h-16 object-cover rounded-lg" />
          
          <div class="flex-1">
            <h4 class="text-white font-semibold text-sm">{{ item.title }}</h4>
            <p class="text-orange-500 font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>

          <div class="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-700">
            <button 
              @click="removeFromCart(item.id)"
              class="w-7 h-7 flex items-center justify-center text-white hover:bg-zinc-800 rounded-md transition"
            >
              -
            </button>
            
            <span class="px-3 text-white font-bold text-sm">{{ item.quantity }}</span>
            
            <button 
              @click="addToCart(item)"
              class="w-7 h-7 flex items-center justify-center text-white hover:bg-zinc-800 rounded-md transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-zinc-800 bg-zinc-900">
        <div class="flex justify-between text-white text-xl font-bold mb-4">
          <span>Total:</span>
          <span class="text-orange-500">${{ cartTotal }}</span>
        </div>
        
        <button 
          @click="handleCheckout"
          class="w-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold py-4 rounded-2xl transition-all active:scale-95"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>