<template>
  <div>
    <!-- Include the Header component -->
    <Header :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
    <HeroSection />
    <main class="container mx-auto p-4">
      <slot />
    </main>
    <footer class="container mx-auto p-4 flex justify-end border-t-2">
      <ul class="flex gap-4 py-4">
        <li><NuxtLink to="/blogs">Blog</NuxtLink></li>
        <li><NuxtLink to="/events">Hotels</NuxtLink></li>
        <li><NuxtLink to="/booking">Booking</NuxtLink></li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);

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
