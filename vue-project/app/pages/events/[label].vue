<template>
  <div>
    <h1 class="text-4xl font-bold my-6 text-center">{{ label }} Hotels</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="hotels.length === 0">No hotels found.</div>
    <div v-else>
      <div v-for="event in events" :key="event.id">
        <div v-for="hotel in hotels" :key="hotel.id" class="flex gap-4 mb-4">
          <HotelsCard :hotel="hotel" :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const label = route.params.label;
const events = ref([]);
const loading = ref(true);

// Computed property for hotels
const hotels = computed(() => {
  return events.value.flatMap((event) => event.hotels || []);
});

// Fetch events data
const fetchEvents = async () => {
  try {
    const response = await fetch(`http://localhost:3001/events?label=${label}`);
    if (!response.ok) throw new Error("Failed to fetch events");
    events.value = await response.json();
    console.log(events.value);
  } catch (error) {
    console.error("Error fetching events:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch data on mount
onMounted(() => {
  fetchEvents();
});
</script>

<style scoped>
img {
  transition: transform 0.3s ease;
}
img:hover {
  transform: scale(1.05);
}
</style>
