<script setup lang="ts">
const {
  hotelId,
  mealPlan,
  flightIncluded,
  packageBaseDiscountMultiplier,
  activity,
  event,
} = defineProps<{
  id: number;
  eventId: number;
  hotelId: number;
  name: string;
  mealPlan: "none" | "breakfast" | "half_board" | "all_inclusive";
  flightIncluded: boolean;
  packageBaseDiscountMultiplier: number;
  activity: { name: string; price: number };
  event: any;
}>();

const mealPlanPrices = {
  none: 0,
  breakfast: 150,
  half_board: 450,
  all_inclusive: 850,
};

const numberOfDays = 7;
const hotelCost = event.hotels[hotelId - 1].price_per_day * numberOfDays;
const mealPlanCost = mealPlanPrices[mealPlan] * numberOfDays;
const flightCost = flightIncluded ? (event.flight_price as number) : 0;

const priceFrom = computed(
  () =>
    ~~(
      (hotelCost + mealPlanCost + flightCost) * packageBaseDiscountMultiplier +
      activity.price
    )
);
</script>

<template>
  <div
    class="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-md"
  >
    <h3>{{ `${name} | Package` }}</h3>
    <img
      class="h-full object-cover rounded-md"
      :src="event.image"
      :alt="event.title"
    />
    <div class="flex flex-row justify-between px-4">
      <span class="flex gap-1"
        >From
        <p class="underline">{{ `$${priceFrom}` }}</p>
      </span>
      <NuxtLink :to="`/packs/${id}`">
        <UButton size="sm" variant="solid"> View </UButton>
      </NuxtLink>
    </div>
  </div>
</template>
