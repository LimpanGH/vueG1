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
      <LoadingBooking v-for="i in bookings.length" :key="i" />
    </template>
  </section>
</template>

<script setup lang="ts">
const { bookings, loading, fetchBookings, cancelBooking } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>
