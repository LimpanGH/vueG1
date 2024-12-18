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
            <p class="text-sm" v-if="earliestTravelDate">
              Total days away: {{ earliestTravelDate.totalTripDays }}
            </p>
            <span class="text-sm">
              {{ earliestTravelDate?.hotelDays }} hotell nights
            </span>
          </div>
        </div>
        <UDivider />
        <div class="flex justify-between items-end">
          <p v-if="earliestTravelDate" class="text-sm mt-2">
            Price from: ${{ basePrice }}/person
          </p>
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

<script setup lang="ts">
const { isLoading, withLoading } = useLoading();
const isCalendarOpen = ref(false);
const isModalOpen = ref(false);
const selectedDates = ref({ start_date: "", end_date: "" });

const props = defineProps<{
  hotel: {
    id?: string;
    name: string;
    available_dates?: AvailableDate[];
    price_per_day: number;
    location?: string;
    rating: number;
    eventLabel?: string;
    image?: string;
  };
  event?: {
    flight_price?: number;
    label?: string;
  };
}>();
const { travelDates } = useTravelDates(props.hotel);
const earliestTravelDate = computed(() => {
  return travelDates.value[0];
});
const basePrice = computed(() => {
  if (!earliestTravelDate.value) return 0;

  const hotelDays = earliestTravelDate.value.hotelDays;

  const hotelCost = props.hotel.price_per_day * hotelDays;
  const flightCost = props.event?.flight_price || 0;

  return hotelCost + flightCost;
});

async function openCalendar() {
  await withLoading(async () => {
    isCalendarOpen.value = true;
  });
}

const handleDateSelection = (dates: {
  start_date: string;
  end_date: string;
}) => {
  selectedDates.value = dates;
  isCalendarOpen.value = false;
  setTimeout(() => {
    isModalOpen.value = true;
  }, 100);
};
</script>
