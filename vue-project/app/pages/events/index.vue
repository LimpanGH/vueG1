<template>
  <h1 class="text-2xl font-bold text-center mb-6">All Hotels</h1>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else-if="hotels.length === 0" class="text-center">
    No hotels available.
  </div>
  <div v-else class="space-y-6">
    <div class="flex justify-end mb-6">
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
const { hotels, loading, sortBy, sortOptions, getBadgeColor } = useEvents();
</script>

<style scoped></style>
