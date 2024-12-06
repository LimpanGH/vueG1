<template>
  <UCard
    class="max-w-4xl max-h-[200px] mx-auto shadow-lg rounded-lg overflow-hidden border flex items-center mb-4"
  >
    <div class="flex max-h-[200px]">
      <div class="w-1/3">
        <img
          :src="hotel.image"
          :alt="hotel.name"
          class="h-full w-full object-cover rounded-lg py-2 overflow-hidden"
        />
      </div>
      <div class="w-2/3 p-6 flex flex-col justify-between gap-2">
        <div>
          <div class="flex justify-between">
            <h3 class="text-md sm:text-2xl font-bold">{{ hotel.name }}</h3>
            <slot></slot>
          </div>
          <p class="text-sm mt-2">Rating: {{ hotel.rating }}/5</p>
          <p class="text-sm mt-2">
            Price from ${{ hotel.price_per_day }}/night
          </p>
        </div>
        <UDivider />
        <div class="flex justify-end items-end">
          <UButton
            icon="i-heroicons-plus-circle"
            color="primary"
            size="sm"
            variant="solid"
            label="Book now"
            @click="isOpen = true"
          />
        </div>
      </div>
    </div>
  </UCard>
  <BookingModal v-model="isOpen" :hotel="hotel" :event="event" />
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const props = defineProps({
  hotel: {
    type: Object,
    required: true,
  },
  event: {
    type: Object,
    required: true,
  },
});
</script>
