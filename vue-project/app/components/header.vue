<template>
	<header class="shadow-sm bg-white dark:bg-slate-900">
		<nav class="container mx-auto p-4 flex justify-between items-center">
			<!-- Logo -->
			<NuxtLink to="/" class="font-bold text-2xl text-[#123f33]">
				<span class="text-black dark:text-gray-300">Sp</span>AI<span class="text-black dark:text-gray-300">ce</span>
			</NuxtLink>

      <!-- Desktop menu -->
      <div class="hidden md:flex gap-2 items-center">
        <form class="relative">
          <input
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

        <div>
          <ClientOnly>
            <ColorModeSelector />
          </ClientOnly>
        </div>
        <ul class="hidden md:flex gap-4 items-center">
          <li><NuxtLink to="/blogs">Blog</NuxtLink></li>
          <li><NuxtLink to="/events">Hotels</NuxtLink></li>
          <li><NuxtLink to="/booking">Booking</NuxtLink></li>
        </ul>
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
      class="md:hidden bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
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
defineProps({
  isMenuOpen: Boolean,
});

defineEmits(["toggle-menu"]);
</script>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
.btn {
  color: white;
}
</style>
