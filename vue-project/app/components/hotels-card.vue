<template>
  <UCard
    class="max-w-4xl max-h-[200px] mx-auto shadow-lg rounded-lg overflow-hidden border dark:border-none flex items-center mb-4"
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
            <div class="flex flex-col sm:flex-row items-start sm:items-center">
              <h3 class="text-[12px] sm:text-[14px] md:text-[18px] font-bold">
                {{ hotel.name }}
              </h3>
              <div class="flex items-center ml-0 sm:ml-2">
                <img
                  v-for="n in hotel.rating"
                  :key="n"
                  src="/spaice-star.png"
                  alt="Star"
                  class="w-[14px] h-[14px] mr-[2px]"
                />
              </div>
            </div>
            <slot></slot>
          </div>
          <div class="">
            <p class="text-[12px] text-gray-500 dark:text-gray-400 mb-3">
              {{ hotel.location }}
            </p>
            <p class="text-sm mt-2">
              Price from ${{ hotel.price_per_day }}/night
            </p>
          </div>
        </div>
        <UDivider />
        <div class="flex justify-end items-end">
          <UButton
            icon="i-heroicons-plus-circle"
            color="primary"
            size="sm"
            variant="solid"
            label="Book now"
            @click="openCalendar()"
            :loading="isLoading"
            :disabled="isLoading"
          />
        </div>
      </div>
    </div>
  </UCard>
  <BookingCalendar
    v-model="isCalendarOpen"
    :hotel="hotel"
    :event="event"
    @selectDate="handleDateSelection"
  />

  <BookingModal
    v-model="isModalOpen"
    :selectedDates="selectedDates"
    :hotel="hotel"
    :event="event"
  />
</template>

<script setup>
import { ref } from "vue";
import { useLoading } from "../composables/useLoading";

const { isLoading, withLoading } = useLoading();
const isCalendarOpen = ref(false);
const isModalOpen = ref(false);
const selectedDates = ref({ start_date: "", end_date: "" });

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

async function openCalendar() {
  await withLoading(async () => {
    isCalendarOpen.value = true;
  });
}

const handleDateSelection = (dates) => {
  console.log("Dates selected:", dates);
  selectedDates.value = dates;
  isCalendarOpen.value = false;
  setTimeout(() => {
    isModalOpen.value = true;
  }, 100);
};
</script>
