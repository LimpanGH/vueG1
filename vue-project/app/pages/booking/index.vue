<template>
  <div>
    <div class="flex justify-between items-center">
      <form class="relative" @submit.prevent>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search bookings..."
          class="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12b488]"
        />
      </form>
      <button @click="handleDeleteAll" class="bg-[red] text-white px-4 py-2 rounded-full">Delete All</button>
    </div>

    <!-- Search Results -->
    <div class="mt-6">
      <div v-if="loading">
        <LoadingBooking />
      </div>
      <div v-else-if="filteredBookings.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="booking in filteredBookings" :key="booking.id" class="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="mb-4">
            <h3 class="text-xl font-bold text-[#12b488] mb-2">{{ booking.eventTitle }}</h3>
            <div class="flex items-center gap-2 text-sm">
              <span class="px-2 py-1 rounded-full bg-green-100 text-green-800">{{ booking.status }}</span>
              <span class="text-gray-500">ID: {{ booking.id }}</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-4">
              <div class="text-sm">
                <p class="text-gray-500">Start Date</p>
                <p class="font-medium">{{ booking.startDate }}</p>
              </div>
              <div class="text-sm">
                <p class="text-gray-500">End Date</p>
                <p class="font-medium">{{ booking.endDate }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="text-sm">
                <p class="text-gray-500">Adults</p>
                <p class="font-medium">{{ booking.adults }}</p>
              </div>
              <div class="text-sm">
                <p class="text-gray-500">Children</p>
                <p class="font-medium">{{ booking.children }}</p>
              </div>
            </div>

            <div class="text-sm">
              <p class="text-gray-500">Contact</p>
              <p class="font-medium">{{ booking.email }}</p>
            </div>

            <div class="text-sm">
              <p class="text-gray-500">Meal Plan</p>
              <p class="font-medium capitalize">{{ booking.mealPlan.replace('_', ' ') }}</p>
            </div>

            <div class="flex gap-4 text-sm">
              <div class="flex items-center gap-1">
                <Icon name="ph:airplane-takeoff" class="text-gray-500" />
                <span>{{ booking.flightIncluded ? 'Flight included' : 'No flight' }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="ph:shield-check" class="text-gray-500" />
                <span>{{ booking.cancellationProtection ? 'Protected' : 'No protection' }}</span>
              </div>
            </div>

            <div class="flex flex-col mt-4 pt-4  border-t">
              <p class="text-lg font-bold text-[#12b488]">${{ booking.totalCost }}</p>
              <button @click="handleDelete(booking.id)" class="bg-red-500  text-white px-4 py-2 rounded-full mt-4">Delete</button>

            </div>

            
          </div>
          
          <!-- Delete button for each card -->
 
        </div>
      </div>
      <div v-else-if="searchQuery" class="text-center text-gray-500">
        No results found for "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBookingStore } from '../../stores/bookingStore.js'

const searchQuery = ref('')
const loading = ref(false)
const bookingStore = useBookingStore()

onMounted(() => {
  const storedBookings = localStorage.getItem('bookings')
  if (storedBookings) {
    bookingStore.bookings = JSON.parse(storedBookings) // Initialize the store with data from localStorage
  }
})

// Filter bookings based on search query
const filteredBookings = computed(() => {
  if (!searchQuery.value) return bookingStore.bookings
  
  const query = searchQuery.value.toLowerCase()
  return bookingStore.bookings.filter(booking => 
    (booking?.eventTitle?.toLowerCase()?.includes(query) || false) ||
    (booking?.status?.toLowerCase()?.includes(query) || false)
  )
})

// Handle Delete for a single booking
const handleDelete = (bookingId: string) => {
  if (confirm('Are you sure you want to delete this booking?')) {
    bookingStore.deleteBooking(bookingId) // Call the store method to delete the booking
    localStorage.setItem('bookings', JSON.stringify(bookingStore.bookings)) // Update localStorage
  }
}

// Handle Delete All
const handleDeleteAll = () => {
  if (confirm('Are you sure you want to delete all bookings?')) {
    bookingStore.deleteAllBookings()
    localStorage.removeItem('bookings')
  }
}
</script>


<style scoped></style>
