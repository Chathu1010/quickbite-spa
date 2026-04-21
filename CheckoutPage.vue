<script setup lang="ts">
import { useCart } from '../composables/useCart'

defineEmits(['close', 'place-order'])
const { cartTotal } = useCart()
</script>

<template>
  <div class="fixed inset-0 z-[55] bg-[#0b0b0b] overflow-y-auto px-6 py-12">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-white">Checkout</h1>
        <button @click="$emit('close')" class="text-zinc-400 hover:text-white underline text-sm">Cancel & Return</button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-6">
          <h2 class="text-xl font-semibold text-white">Delivery Information</h2>
          <div class="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Full Name" class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500" />
            <input type="text" placeholder="Phone Number" class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500" />
            <input type="text" placeholder="Delivery Address" class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500" />
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500" />
              <input type="text" placeholder="Postal Code" class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500" />
            </div>
          </div>
        </div>

        <div class="space-y-6 text-white">
          <h2 class="text-xl font-semibold">Payment Method</h2>
          <div class="space-y-3">
            <label class="flex items-center p-4 bg-zinc-900 border-2 border-orange-500 rounded-2xl cursor-pointer">
              <input type="radio" name="payment" checked class="accent-orange-500 mr-4" />
              <div>
                <p class="font-bold">Cash on Delivery</p>
                <p class="text-xs text-zinc-500">Pay when you receive</p>
              </div>
            </label>
            <label class="flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer hover:border-zinc-700">
              <input type="radio" name="payment" class="accent-orange-500 mr-4" />
              <div>
                <p class="font-bold">Credit / Debit Card</p>
                <p class="text-xs text-zinc-500">Visa, Mastercard, etc.</p>
              </div>
            </label>
          </div>

          <div class="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div class="flex justify-between text-zinc-400"><span>Subtotal</span><span>${{ cartTotal }}</span></div>
            <div class="flex justify-between text-zinc-400"><span>Delivery Fee</span><span>$2.50</span></div>
            <div class="flex justify-between text-orange-500"><span>Discount</span><span>-$5.00</span></div>
            <div class="flex justify-between text-2xl font-black pt-4 border-t border-zinc-800">
              <span>Total</span>
              <span>${{ (parseFloat(cartTotal) + 2.50 - 5.00).toFixed(2) }}</span>
            </div>
            
            <button 
              @click="$emit('place-order')"
              class="w-full bg-orange-500 text-black font-black py-4 rounded-2xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>