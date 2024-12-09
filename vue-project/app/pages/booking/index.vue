<template>
	<div>booking</div>
	<form class="relative" @submit.prevent="handleSearch">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12b488]"
          />
          <button type="submit" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>
        </form>

  <!-- Search Results -->
  <div class="mt-6">
    <div v-if="loading">
      <LoadingBooking />
    </div>
    <div v-else-if="filteredBookings.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="booking in filteredBookings" :key="booking.id" class="border p-4 rounded-lg">
        <h3 class="font-bold">{{ booking.eventTitle }}</h3>
        <p class="text-gray-600">Status: {{ booking.status }}</p>
        <p class="text-sm text-gray-500 mt-2">Booking ID: {{ booking.id }}</p>
      </div>
    </div>
    <div v-else-if="searchQuery" class="text-center text-gray-500">
      No results found for "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Booking {
  id: string
  userId: number
  eventId: string
  eventTitle: string
  status: string
}

const searchQuery = ref('')
const bookings = ref<Booking[]>([])
const loading = ref(false)

// Fetch bookings from db.json
const fetchBookings = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    const data = await response.json()
    bookings.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching bookings:', error)
    bookings.value = []
  } finally {
    loading.value = false
  }
}

// Filter bookings based on search query
const filteredBookings = computed(() => {
  if (!searchQuery.value) return bookings.value
  
  const query = searchQuery.value.toLowerCase()
  return bookings.value.filter(booking => 
    (booking?.eventTitle?.toLowerCase()?.includes(query) || false) ||
    (booking?.status?.toLowerCase()?.includes(query) || false)
  )
})

// Handle search form submission
const handleSearch = () => {
  // You can add additional search logic here if needed
}

// Fetch bookings when component mounts
onMounted(() => {
  fetchBookings()
})
</script>

<style scoped></style>
