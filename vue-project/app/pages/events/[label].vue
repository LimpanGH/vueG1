<template>
  <div>
    <div class="mt-12 mb-8">
      <h1 class="text-2xl font-bold text-center tracking-wider">
        {{ label }} Hotels for Every Taste
      </h1>
      <p class="text-center tracking-wide">
        Discover the perfect hotel for your adventure to {{ label }}!
      </p>
    </div>
    <div v-if="loading"><LoadingHotels v-for="i in 5" :key="i" /></div>
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

const hotels = computed(() => {
  return events.value.flatMap((event) => event.hotels || []);
});

const fetchEvents = async () => {
  try {
    const response = await fetch(`http://localhost:3001/events?label=${label}`);
    if (!response.ok) throw new Error("Failed to fetch events");
    events.value = await response.json();
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
