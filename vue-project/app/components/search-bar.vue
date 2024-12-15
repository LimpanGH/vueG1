<template>
  <div ref="searchWrapper" class="relative max-w-xl mx-auto">
    <UInput
      v-model="searchQuery"
      placeholder="Search..."
      @input="handleSearch"
      class="w-full h-[40px] flex items-center"
      icon="i-heroicons-magnifying-glass"
    />

    <div
      v-if="showResults && (eventResults.length > 0 || hotelResults.length > 0)"
      class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700"
    >
      <div class="p-2">
        <div v-if="eventResults.length > 0">
          <div class="text-sm text-gray-500 dark:text-gray-400 px-3 py-1">
            Destinations
          </div>
          <UButton
            v-for="event in eventResults"
            :key="event.id"
            :to="`/events/${event.label}`"
            variant="ghost"
            class="w-full justify-start mb-1"
            @click="clearSearch"
          >
            <template #leading>
              <UAvatar :src="event.image" size="sm" />
            </template>
            {{ event.title }}
          </UButton>
        </div>

        <div v-if="hotelResults.length > 0">
          <div class="text-sm text-gray-500 dark:text-gray-400 px-3 py-1">
            Hotels
          </div>
          <UButton
            v-for="hotel in hotelResults"
            :key="hotel.id"
            :to="`/events/${hotel.eventLabel}`"
            variant="ghost"
            class="w-full justify-start mb-1"
            @click="clearSearch"
          >
            <template #leading>
              <UAvatar :src="hotel.image" size="sm" />
            </template>
            {{ hotel.name }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useSearch } from "../composables/useSearch";
import type { Event, Hotel } from "../types";

const searchQuery = ref("");
const showResults = ref(false);
const eventResults = ref<Event[]>([]);
const hotelResults = ref<(Hotel & { eventLabel: string })[]>([]);
const isLoading = ref(false);

const { events, loading, error, fetchSearchData } = useSearch();

onMounted(() => {
  fetchSearchData();
});

const handleSearch = () => {
  if (!searchQuery.value) {
    showResults.value = false;
    return;
  }

  isLoading.value = true;
  try {
    const query = searchQuery.value.toLowerCase();

    eventResults.value =
      events.value
        ?.filter(
          (event) =>
            event.title.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
        )
        .slice(0, 3) || [];

    // Sök bland hotell
    hotelResults.value =
      events.value
        ?.flatMap((event) =>
          event.hotels.map((hotel) => ({
            ...hotel,
            eventLabel: event.label,
          }))
        )
        .filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(query) ||
            hotel.location.toLowerCase().includes(query)
        )
        .slice(0, 3) || [];

    showResults.value = true;
  } catch (error) {
    console.error("Error searching:", error);
  } finally {
    isLoading.value = false;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  showResults.value = false;
};

const searchWrapper = ref<HTMLElement | null>(null);

onClickOutside(searchWrapper, () => {
  showResults.value = false;
});
</script>
