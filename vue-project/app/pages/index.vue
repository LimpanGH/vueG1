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
		<h1 class="text-4xl font-medium">Event Booking App</h1>
		<h2 class="text-2xl font-medium">All Events</h2>
		<section class="grid grid-cols-2 gap-8">
			<template v-if="!eventsLoading">
				<EventCard
					v-for="event in events"
					:key="event.id"
					:title="event.title"
					:when="event.date"
					:image="event.image"
					:description="event.description"
					@register="handleRegistration(event)"
				/>
			</template>
			<template v-else>
				<LoadingEventCard v-for="i in 6" :key="i" />
			</template>
		</section>
		<h2 class="text-2xl font-medium">Your Bookings</h2>
		<section class="grid grid-cols-1 gap-4">
			<template v-if="!bookingLoading">
				<BookingItem
					v-for="booking in bookings"
					:title="booking.eventTitle"
					:key="booking.id"
					@delete="deleteBooking(booking.id)"
				/>
			</template>
			<template v-else>
				<LoadingBooking v-for="i in bookings.length + 1" :key="i" />
			</template>
		</section>
	</main>
</template>

<script setup>
const isOpen = ref(false);

const events = ref([]);
const eventsLoading = ref(false);
const bookings = ref([]);
const bookingLoading = ref(false);

definePageMeta({
	layout: 'start',
});

const fetchEvents = async () => {
	eventsLoading.value = true;
	try {
		const response = await fetch('http://localhost:3001/events');
		events.value = await response.json();
	} finally {
		eventsLoading.value = false;
	}
};

const fetchBookings = async () => {
	bookingLoading.value = true;
	try {
		const response = await fetch('http://localhost:3001/bookings');
		bookings.value = await response.json();
	} finally {
		bookingLoading.value = false;
	}
};

const handleRegistration = async (event) => {
	const newBooking = {
		id: Date.now().toString(),
		userId: 1,
		eventId: event.id,
		eventTitle: event.title,
	};

	await fetch('http://localhost:3001/bookings', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...newBooking,
			status: 'confirmed',
		}),
	});

	await fetchBookings();
	eventsLoading.value = false;
};

const deleteBooking = async (bookingId) => {
	await fetch(`http://localhost:3001/bookings/${bookingId}`, {
		method: 'DELETE',
	});

	bookings.value = bookings.value.filter((booking) => booking.id !== bookingId);
};

onMounted(() => {
	fetchEvents();
	fetchBookings();
});
</script>

<style scoped></style>
