<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../composables/useCart'

// This defines the signals this page sends back to App.vue
defineEmits(['close', 'place-order'])

const { cartTotal } = useCart()

// This is the variable that tracks which option is clicked
// We start with 'cod' (Cash on Delivery)
const paymentMethod = ref('cod')
</script>

<template>
  <div class="fixed inset-0 z-[55] bg-[#0b0b0b] overflow-y-auto px-6 py-12">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-white text-left">Checkout</h1>
        <button @click="$emit('close')" class="text-zinc-400 hover:text-white underline text-sm">
          Cancel & Return
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-white text-left">Delivery Information</h2>
          <div class="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Full Name" class="input-style" />
            <input type="text" placeholder="Phone Number" class="input-style" />
            <input type="text" placeholder="Delivery Address" class="input-style" />
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" class="input-style" />
              <input type="text" placeholder="Postal Code" class="input-style" />
            </div>
            <label class="flex items-center space-x-2 text-zinc-400 text-sm cursor-pointer mt-2">
              <input type="checkbox" class="accent-orange-500 w-4 h-4" checked />
              <span>Save this address</span>
            </label>
          </div>
        </div>

        <div class="space-y-6 text-white">
          <h2 class="text-xl font-semibold text-left">Payment Method</h2>
          
          <div class="space-y-3">
            <label 
              class="flex items-center p-4 bg-zinc-900 border-2 rounded-2xl cursor-pointer transition-all"
              :class="paymentMethod === 'cod' ? 'border-orange-500' : 'border-zinc-800'"
            >
              <input type="radio" v-model="paymentMethod" value="cod" class="accent-orange-500 mr-4" />
              <div class="text-left">
                <p class="font-bold">Cash on Delivery</p>
                <p class="text-xs text-zinc-500">Pay when you receive</p>
              </div>
            </label>

            <label 
              class="flex items-center p-4 bg-zinc-900 border-2 rounded-2xl cursor-pointer transition-all"
              :class="paymentMethod === 'card' ? 'border-orange-500' : 'border-zinc-800'"
            >
              <input type="radio" v-model="paymentMethod" value="card" class="accent-orange-500 mr-4" />
              <div class="text-left">
                <p class="font-bold">Credit / Debit Card</p>
                <p class="text-xs text-zinc-500">Visa, Mastercard, etc.</p>
              </div>
            </label>

            <div v-if="paymentMethod === 'card'" class="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-3 mt-2">
              <input type="text" placeholder="Card Number" class="input-style" />
              <div class="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" class="input-style" />
                <input type="text" placeholder="CVV" class="input-style" />
              </div>
            </div>
          </div>

          <div class="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 space-y-4 mt-8">
            <h3 class="text-left text-zinc-400 font-bold text-sm uppercase tracking-wider">Order Summary</h3>
            <div class="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>${{ cartTotal }}</span>
            </div>
            <div class="flex justify-between text-zinc-400">
              <span>Delivery Fee</span>
              <span>$2.50</span>
            </div>
            <div class="flex justify-between text-orange-500">
              <span>Discount</span>
              <span>-$5.00</span>
            </div>
            <div class="flex justify-between text-white text-2xl font-black pt-4 border-t border-zinc-800">
              <span>Total</span>
              <span>${{ (parseFloat(cartTotal) + 2.50 - 5.00).toFixed(2) }}</span>
            </div>
            
            <button 
              @click="$emit('place-order')"
              class="w-full bg-orange-500 text-black font-black py-4 rounded-2xl hover:bg-orange-400 transition-all active:scale-95 mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Logic moved to global style.css to fix PostCSS errors */
</style>