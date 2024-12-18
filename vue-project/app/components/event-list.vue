<template>
  <template v-if="error">
    <UCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500 text-center">
          Could not load events at the moment. Please start the JSON server.
        </div>
        <RoundButton @click="fetchEvents">Retry now</RoundButton>
      </div>
    </UCard>
  </template>

  <template v-else>
    <form class="relative col-span-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="px-4 py-2 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
      />
      <button
        type="submit"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
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
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Search Input (Received from Header) -->

      <!--  <div class="col-span-2">
        <input
          v-model="searchQuery"
          placeholder="Search events..."
          class="p-2 border border-gray-300 rounded w-full"
        />
      </div> -->

      <template v-if="!loading">
        <template v-if="filteredEvents.length">
          <EventCard
            v-for="event in filteredEvents"
            :key="event.id"
            :title="event.title"
            :when="event.date"
            :image="event.image"
            :label="event.label"
            :description="event.description"
            @register="handleRegistration(event)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">No events yet.</div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";
import useBookings from "~/composables/useBookings";

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  label: string;
  description: string;
}

const { handleRegistration } = useBookings();

const events = ref<Event[]>([]);
const loading = ref(false);
const error = ref<Error | null>(null);
const searchQuery = ref("");

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("http://localhost:3001/events");
    events.value = (await response.json()) as Event[];
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchEvents());

const filteredEvents = computed(() => {
  return events.value.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSearchQuery = debounce((query: string) => {
  searchQuery.value = query;
}, 300);

watch(searchQuery, (newQuery) => {
  handleSearchQuery(newQuery);
});
</script>
