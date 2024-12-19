<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium text-center">Space Events</h1>
    <h2 class="text-2xl font-medium">Our Destinations</h2>
    <EventList />
    <h2 class="text-2xl font-medium">Package Deals</h2>
    <PackageList />
    <h2 class="text-2xl font-medium">Watchlist</h2>
    <BookingList />
    <h2 class="text-2xl font-medium">Blogg Articles: Experience The Journey</h2>
    <article-list />
  </main>
</template>

<script setup>
import ArticleList from "~/components/article-list.vue";

definePageMeta({
  layout: "start",
});
</script>

<style scoped></style>
