<template>
  <div>
    <!-- Include the Header component -->
    <Header :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
    <HeroSection />
    <main class="container mx-auto p-4 md:px-16">
      <slot />
    </main>

    <footer
      class="w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 mt-12"
    >
      <span
        class="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex items-center"
        ><img src="/spaice-logo.png" class="max-w-[80px] mr-3" />© 2024 All
        Rights Reserved.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li>
          <NuxtLink to="/blogs" class="hover:underline me-4 md:me-6"
            >Blog</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/events" class="hover:underline me-4 md:me-6"
            >Hotels</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/packs" class="hover:underline me-4 md:me-6"
            >Packages</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/booking" class="hover:underline me-4 md:me-6"
            >Booking</NuxtLink
          >
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from "@/stores/bookingStore";
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { usePackageBookingStore } from "~/stores/packageBookingStore";

const isMenuOpen = ref(false);

const bookingStore = useBookingStore();
bookingStore.loadingBookings();

const { loadPackageBookings } = usePackageBookingStore();
loadPackageBookings();

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
      crossorigin: "",
    },
  ],
});
</script>

<style>
body {
  font-family: "Inter", sans-serif;
}

.router-link-exact-active {
  color: #12b488;
}
</style>
