<template>
	<section class="grid grid-cols-1 gap-4">
		<template v-if="!loading">
			<BookingItem
				v-for="booking in bookings"
				:key="booking.id"
				:title="booking.eventTitle"
				:status="booking.status"
				@cancelled="cancelBooking(booking.id)"
			/>
		</template>
		<template v-else>
			<LoadingBookingItem v-for="i in 4" :key="i" />
		</template>
	</section>
</template>

<script setup>
const { bookings, loading, fetchBookings, cancelBooking } = useBookings();

onMounted(() => {
	fetchBookings();
});
</script>
