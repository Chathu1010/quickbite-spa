import { ref } from 'vue'
import type { Product } from '../types'

export const useProducts = () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      // Fetching 30 items from DummyJSON to satisfy project requirements
      const response = await fetch('https://dummyjson.com/products/category/groceries?limit=30')
      if (!response.ok) throw new Error('Failed to fetch from API')
      const data = await response.json()
      
      const customFood = [
        { title: "Pepperoni Pizza", price: 14.99, thumb: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", desc: "Fresh mozzarella and premium pepperoni." },
        { title: "Classic Beef Burger", price: 12.99, thumb: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", desc: "Juicy beef patty with cheddar and lettuce." },
        { title: "Egg Fried Rice", price: 8.99, thumb: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500", desc: "Wok-tossed rice with authentic spices." },
        { title: "Hakka Noodles", price: 9.99, thumb: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500", desc: "Chili garlic noodles with crisp veggies." },
        { title: "Fried Chicken", price: 11.50, thumb: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500", desc: "Golden brown southern-style chicken." },
        { title: "Pasta Carbonara", price: 13.40, thumb: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500", desc: "Classic pasta with parmesan and bacon." },
        { title: "Sushi Platter", price: 18.99, thumb: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500", desc: "Assorted fresh fish and avocado rolls." },
        { title: "Grilled Salad", price: 10.25, thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500", desc: "Mixed greens with balsamic glaze." },
        { title: "Chocolate Lava Cake", price: 6.99, thumb: "https://th.bing.com/th/id/OIP.cER6dv81-ywGSRmbTZr3IgHaJy?w=202&h=267&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Warm cake with a molten center." },
        { title: "Caramel Latte", price: 4.50, thumb: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500", desc: "Chilled espresso with creamy milk." },
        { title: "Beef Tacos", price: 9.00, thumb: "https://th.bing.com/th/id/OIP.r26FdOfa27arX9DQE7hSOQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Corn tortillas with fresh salsa." },
        { title: "Berry Smoothie", price: 5.95, thumb: "https://th.bing.com/th/id/OIP.3pmguI5LuzcQpQgFidpfqQHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Blended strawberries and yogurt." },
        { title: "Glazed Donuts", price: 3.50, thumb: "https://th.bing.com/th/id/OIP.gY0AooNkI9aWS0cDjcRaEgHaHa?w=202&h=202&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Sweet, soft, and freshly baked." },
        { title: "Fish & Chips", price: 14.50, thumb: "https://th.bing.com/th/id/OIP.UYsybVO_jZ38a5p4m1VdlQHaFj?w=252&h=189&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Crispy cod with tartare sauce." },
        { title: "Club Sandwich", price: 8.50, thumb: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500", desc: "Triple-decker with chicken and ham." },
        { title: "Hot Wings", price: 11.99, thumb: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500", desc: "Spicy buffalo wings with blue cheese." },
        { title: "Veggie Ramen", price: 12.50, thumb: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500", desc: "Rich broth with miso and bamboo shoots." },
        { title: "Red Velvet Cupcake", price: 4.25, thumb: "https://th.bing.com/th/id/OIP.0yyme-AXrwC4bVGaVwXVTQHaJQ?w=202&h=253&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Fluffy cake with cream cheese frosting." },
        { title: "BBQ Ribs", price: 19.99, thumb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500", desc: "Slow-cooked pork with smoky BBQ sauce." },
        { title: "Mango Lassi", price: 4.99, thumb: "https://th.bing.com/th/id/OIP.aRYfW-Jq2VSF37Be0fJQ5gHaJQ?w=202&h=253&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", desc: "Refreshing Indian mango yogurt drink." },
        { title: "Grilled Salmon", price: 17.50, thumb: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500", desc: "Atlantic salmon with lemon and herbs." },
        { title: "Classic Pancakes", price: 9.50, thumb: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500", desc: "Stack of pancakes with maple syrup." },
        { title: "Mushroom Risotto", price: 13.99, thumb: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500", desc: "Creamy rice with wild mushrooms." },
        { title: "Stadium Hot Dog", price: 5.50, thumb: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=500", desc: "Classic beef frank with mustard." },
        { title: "Fruit Tart", price: 7.25, thumb: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500", desc: "Buttery pastry with vanilla custard." },
        { title: "Chicken Tikka", price: 12.99, thumb: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500", desc: "Spiced chicken skewers from the tandoor." },
        { title: "Greek Salad", price: 9.25, thumb: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500", desc: "Feta, olives, and crisp cucumbers." },
        { title: "Iced Tea", price: 3.25, thumb: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500", desc: "Refreshing lemon tea with ice." },
        { title: "Garlic Bread", price: 4.99, thumb: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500", desc: "Toasted baguette with herb butter." },
        { title: "Steak Fries", price: 5.99, thumb: "https://images.unsplash.com/photo-1573016608244-7d5fb097f481?w=500", desc: "Thick-cut potatoes with sea salt." }
      ]

      // Map the 30 items from API to our custom high-quality list
      products.value = data.products.slice(0, 30).map((item: any, index: number) => ({
        ...item,
        title: customFood[index].title,
        price: customFood[index].price,
        thumbnail: customFood[index].thumb,
        description: customFood[index].desc
      }))
      
    } catch (err) {
      error.value = "Failed to load the menu. Please check your connection."
      console.error("Fetch error:", err)
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}