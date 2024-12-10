<template>
	<main class="container mx-auto my-8 space-y-8">
		<h1 class="text-4xl font-medium text-center">Space Events</h1>
		<h2 class="text-2xl font-medium">Our Destinations</h2>
		<EventList />
		<h2 class="text-2xl font-medium">Watchlist</h2>
		<BookingList />

		<h2 class="text-2xl font-medium">Experience the Journey</h2>
		<ExperienceArticles />
	</main>
</template>

<script setup>
import ExperienceArticles from '~/components/experience-articles.vue';

definePageMeta({
	layout: 'start',
});
</script>

<style scoped></style>
