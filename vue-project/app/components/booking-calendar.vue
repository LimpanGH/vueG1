<script setup lang="ts">
import { z } from "zod";
import { useLoading } from "../composables/useLoading";
const { isLoading, withLoading } = useLoading();

interface AvailableDate {
  date: string;
  days_before_hotel: number;
  arrival_home_day: string;
}

const props = defineProps<{
  modelValue: boolean;
  hotel: {
    id: string;
    name: string;
    available_dates: AvailableDate[];
  };
  event?: {
    flight_price: number;
  };
}>();

const emit = defineEmits(["update:modelValue", "selectDate"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const form = ref<HTMLFormElement | null>(null);

const state = reactive({
  start_date: "",
});

// Format date for display
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Sort and format travel dates
const travelDates = computed(() => {
  return (props.hotel?.available_dates || [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((dates) => {
      const totalTripDays = Math.ceil(
        (new Date(dates.arrival_home_day).getTime() -
          new Date(dates.date).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const hotelDays = totalTripDays - dates.days_before_hotel * 2;

      return {
        departureDate: dates.date,
        returnDate: dates.arrival_home_day,
        formattedDepartureDate: formatDate(dates.date),
        formattedReturnDate: formatDate(dates.arrival_home_day),
        travelDays: dates.days_before_hotel,
        totalTripDays,
        hotelDays,
      };
    });
});

const schema = z.object({
  start_date: z.string().min(1, "Start date is required"),
});

const confirmDate = async (event: Event) => {
  await withLoading(async () => {
    event.preventDefault();
    console.log("Confirming date with:", state.start_date);

    const selectedEndDate = travelDates.value.find(
      (d) => d.departureDate === state.start_date
    )?.returnDate;

    if (state.start_date && selectedEndDate) {
      console.log("Emitting dates:", {
        start_date: state.start_date,
        end_date: selectedEndDate,
      });

      emit("selectDate", {
        start_date: state.start_date,
        end_date: selectedEndDate,
      });

      isOpen.value = false;
    }
  });
};
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <UForm
        ref="form"
        :state="state"
        :schema="schema"
        @submit="confirmDate"
        class="space-y-4"
      >
        <div class="space-y-4 mb-4">
          <h3 class="text-lg font-semibold mb-2">
            Available Travel Dates for {{ hotel.name }}
          </h3>

          <div
            v-for="dates in travelDates"
            :key="dates.departureDate"
            class="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded border-b"
          >
            <div class="flex-grow space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-500"
                  >Departure from Earth:</span
                >
                <span>{{ dates.formattedDepartureDate }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-500"
                  >Return to Earth:</span
                >
                <span>{{ dates.formattedReturnDate }}</span>
              </div>
              <div class="text-sm text-gray-500">
                Travel time: {{ dates.travelDays }} days (one way)
              </div>
              <div class="text-sm text-gray-500">
                Total trip duration including hotel stay:
                {{ dates.totalTripDays }} days
              </div>
              <div class="text-sm font-medium text-green-600">
                Days at hotel: {{ dates.hotelDays }} days
              </div>
            </div>
            <URadio
              v-model="state.start_date"
              :value="dates.departureDate"
              name="start_date"
            />
          </div>
        </div>

        <div class="flex justify-between">
          <p>Total: {{ event?.flight_price }} $</p>
          <UButton
            type="submit"
            color="green"
            variant="solid"
            label="Next step"
            :disabled="!state.start_date || isLoading"
            :loading="isLoading"
          />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<style scoped>
.date-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
