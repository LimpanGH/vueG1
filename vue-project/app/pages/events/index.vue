<template>
  <div class="mt-12 mb-4">
    <h1 class="text-2xl font-bold text-center tracking-wider">
      Hotels for Every Taste
    </h1>
    <p class="text-center tracking-wide">
      Find the Perfect Hotel for Your Space Journey
    </p>
  </div>
  <div v-if="loading" class="text-center">
    <LoadingHotels v-for="i in 10" :key="i" />
  </div>
  <div v-else-if="hotels.length === 0" class="text-center">
    No hotels available.
  </div>
  <div v-else class="space-y-6 max-w-4xl flex justify-center flex-col mx-auto">
    <div class="flex justify-end">
      <USelect
        v-model="sortBy"
        :options="sortOptions"
        class="w-[100px] max-w-md"
      />
    </div>
    <div v-for="hotel in hotels" :key="hotel.name">
      <HotelsCard :hotel="hotel" :event="hotel.event">
        <NuxtLink :to="`/events/${hotel.eventLabel}`">
          <UBadge :color="getBadgeColor(hotel.eventLabel)" class="text-sm">
            {{ hotel.eventLabel }}
          </UBadge>
        </NuxtLink>
      </HotelsCard>
    </div>
    <div v-for="hotel in hotels" :key="hotel.name">
      <HotelsCard :hotel="hotel" :event="{ label: hotel.eventLabel }">
        <NuxtLink :to="`/events/${hotel.eventLabel}`">
          <UBadge :color="getBadgeColor(hotel.eventLabel)" class="text-sm">
            {{ hotel.eventLabel }}
          </UBadge>
        </NuxtLink>
      </HotelsCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEvents } from "~/composables/useEvents";
const { events, hotels, loading, sortBy, sortOptions, getBadgeColor } =
  useEvents();
</script>

<style scoped></style>
