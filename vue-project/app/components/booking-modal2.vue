<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Available Hotels </template>
      <div v-if="filteredHotels.length" class="hotel-list">
        <ul class="space-y-4">
          <li
            v-for="hotel in filteredHotels"
            :key="hotel.id"
            class="hotel-item flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white dark:bg-slate-800"
          >
            <img
              :src="hotel.image"
              :alt="hotel.name"
              class="hotel-image w-24 h-24 object-cover rounded-lg"
            />
            <div class="hotel-details flex-1">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ hotel.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ hotel.location }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Rating: {{ hotel.rating }} stars
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Price per day: ${{ hotel.price_per_day }}
              </p>
              <UButton @click="selectHotel(hotel)" color="blue" variant="solid"
                >Select</UButton
              >
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hotels available for the selected dates</p>
      </div>
      <div class="flex justify-between mt-4">
        <UButton
          @click="bookHotel"
          color="green"
          variant="solid"
          label="Book now"
          :loading="isLoading"
          :disabled="isLoading || !selectedHotel"
        />
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useBookingStore } from "../stores/bookingStore";
import { useLoading } from "../composables/useLoading";
import db from "../db2.json"; // Importera db.json

const { isLoading, withLoading } = useLoading();
const props = defineProps<{
  modelValue: boolean;
  startDate: string;
  endDate: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const hotels = ref(db.events.flatMap((event) => event.hotels)); // Använd alla hotell data från db.json
const selectedHotel = ref(null);

const selectHotel = (hotel) => {
  selectedHotel.value = hotel;
};

const bookingStore = useBookingStore();

const bookHotel = async () => {
  if (!selectedHotel.value) return;

  await withLoading(async () => {
    try {
      bookingStore.addBooking({
        eventId: selectedHotel.value.eventId,
        eventTitle: selectedHotel.value.eventTitle,
        startDate: props.startDate,
        endDate: props.endDate,
        adults: 1,
        children: 0,
        mealPlan: "none",
        name: "",
        email: "",
        flightIncluded: false,
        cancellationProtection: false,
        totalCost: 0,
      });

      isOpen.value = false;
    } catch (error) {
      console.error("Error booking hotel:", error);
    }
  });
};

const filteredHotels = computed(() => {
  const startDate = new Date(props.startDate);
  const endDate = new Date(props.endDate);

  return hotels.value.filter((hotel) => {
    return hotel.available_dates.some((date) => {
      const hotelDate = new Date(date);
      return hotelDate >= startDate && hotelDate <= endDate;
    });
  });
});

watch([() => props.startDate, () => props.endDate], () => {
  filteredHotels.value = filteredHotels.value;
});
</script>

<style scoped>
.hotel-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hotel-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  background-color: var(--background-color, #1e2734);
}

.hotel-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.hotel-details {
  flex: 1;
}

.hotel-details h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color, #e0e0e0);
}

.hotel-details p {
  margin: 0.25rem 0;
  color: var(--text-color, #b0b0b0);
}
</style>
