<template>
	<section>
		<BookingModal v-model="isOpen" />
		<UButton
			icon="i-heroicons-plus-circle"
			color="white"
			variant="solid"
			label="Boka nu!"
			@click="isOpen = true"
		/>
	</section>
	<main class="container mx-auto my-8 space-y-8">
		<h1 class="text-4xl font-medium">Space Events</h1>
		<h2 class="text-2xl font-medium">Our Events</h2>
		<EventList />
		<h2 class="text-2xl font-medium">Your Bookings</h2>
		<BookingList />
	</main>
</template>

<script setup>
const isOpen = ref(false);

definePageMeta({
	layout: 'start',
});
</script>

<style scoped></style>
