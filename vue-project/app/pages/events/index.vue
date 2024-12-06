<template>
  <h1 class="text-2xl font-bold text-center mb-6">All Hotels</h1>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else-if="hotels.length === 0" class="text-center">
    No hotels available.
  </div>
  <div v-else class="space-y-6">
    <div v-for="event in events" :key="event.id">
      <div v-for="hotel in event.hotels" :key="hotel.name">
        <HotelsCard :hotel="hotel" :event="event">
          <NuxtLink :to="`/events/${event?.label}`">
            <UBadge :color="getBadgeColor(event?.label)" class="text-sm">
              {{ event?.label }}
            </UBadge>
          </NuxtLink>
        </HotelsCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Hotel {
  name: string;
  rating: number;
  price_per_day: number;
  image: string;
}

interface Event {
  hotels?: Hotel[];
  id: string;
  label: string;
}
// Reactive state
const events = ref<Event[]>([]);
const loading = ref(true);

// Computed property to extract all hotels
const hotels = computed(() => {
  return events.value.flatMap((event) => event.hotels || []);
});

// Fetch all events on mount
const fetchEvents = async () => {
  try {
    const response = await fetch("http://localhost:3001/events");
    if (!response.ok) throw new Error("Failed to fetch events");
    events.value = await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEvents();
});

const getBadgeColor = (label: string) => {
  if (!label) return "gray";

  switch (label) {
    case "Asteroid":
      return "gray";
    case "Jupiter":
      return "indigo";
    case "Atlantis":
      return "teal";
    case "Mars":
      return "red";
    case "Surprise":
      return "yellow";
    case "Moon":
      return "blue";
    default:
      return "gray";
  }
};
</script>

<style scoped></style>
