<template>
  <header class="shadow-sm dark:shadow-gray-800 dark:bg-gray-800">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="font-bold text-3xl text-[#123f33]">
        <img src="/spaice-logo.png" alt="logo" class="max-w-[100px] sm:" />
      </NuxtLink>

      <!-- Desktop menu -->
      <div class="hidden md:flex gap-2 items-center">
        <form class="relative">
          <SearchBar />
          <button
            type="submit"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
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

        <ul
          class="hidden md:flex gap-4 items-center text-gray-500 dark:text-gray-400 ml-4"
        >
          <li>
            <NuxtLink class="hover:underline hover:text-[#4ade80]" to="/events"
              >Hotels</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="hover:underline hover:text-[#4ade80]" to="/packs"
              >Packages</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="hover:underline hover:text-[#4ade80]" to="/blogs"
              >Blog</NuxtLink
            >
          </li>
          <li class="relative">
            <NuxtLink
              class="hover:underline hover:text-[#4ade80]"
              to="/booking"
            >
              <ShoppingBasketSvg
                class="w-6 h-6 hover:text-[#4ade80]"
                style="fill: #4ade80"
              />
              <span
                v-if="bookingCount > 0"
                class="absolute bottom-1 left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center"
              >
                {{ bookingCount }}
              </span>
            </NuxtLink>
          </li>
        </ul>

        <div>
          <ClientOnly>
            <ColorModeSelector />
          </ClientOnly>
        </div>
      </div>
      <!-- Mobile menu button -->
      <div class="md:hidden flex gap-4">
        <ClientOnly>
          <ColorModeSelector />
        </ClientOnly>
        <button
          @click="$emit('toggle-menu')"
          class="text-gray-500 focus:outline-none"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
    >
      <ul class="space-y-4 py-4 px-6 border-b-2">
        <li><NuxtLink to="/blogs">Blog</NuxtLink></li>
        <li><NuxtLink to="/events">Hotels</NuxtLink></li>
        <li><NuxtLink to="/booking">Booking</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import ShoppingBasketSvg from "./ShoppingBasketSvg.vue";
import { useBookingStore } from "@/stores/bookingStore";
defineProps({
  isMenuOpen: Boolean,
});

defineEmits(["toggle-menu"]);

const bookingStore = useBookingStore();
const bookingCount = computed(() => bookingStore.bookingCount);
</script>

<style scoped>
.router-link-exact-active {
  color: #4ade80;
}
.btn {
  color: white;
}
</style>
