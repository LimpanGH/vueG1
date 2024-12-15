<script setup lang="ts">
import { z } from "zod";
import { useBookingStore } from "../stores/bookingStore";
import { useLoading } from "../composables/useLoading";
const { isLoading, withLoading } = useLoading();
const snackbar = useSnackbar();

const props = defineProps<{
  modelValue: boolean;
  selectedDates: {
    start_date: string;
    end_date: string;
  };
  hotel: any;
  event: any;
}>();

const emit = defineEmits(["update:modelValue"]);

const form = ref<HTMLFormElement | null>(null);

const state = reactive<State>({
  start_date: "",
  end_date: "",
  adults: 1,
  children: 0,
  meal_plan: "none",
  cancellation_protection: false,
  name: "",
  email: "",
  flight_back_and_forth: false,
});

const schema = z.object({
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  adults: z.number().min(1, "At least one adult is required"),
  children: z.number().min(0),
  meal_plan: z.enum(["none", "breakfast", "half_board", "all_inclusive"]),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  flight_back_and_forth: z.boolean(),
  cancellation_protection: z.boolean(),
});

const totalPeople = computed(() => {
  return Number(state.adults) + Number(state.children);
});

const basePrice = computed(() => {
  if (!state.start_date || !state.end_date) return 0;

  const availableDate = props.hotel.available_dates.find(
    (date: { date: string }) => date.date === state.start_date
  );

  if (!availableDate) return 0;

  const totalTripDays = Math.ceil(
    (new Date(availableDate.arrival_home_day).getTime() -
      new Date(availableDate.date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const hotelDays = totalTripDays - availableDate.days_before_hotel * 2;

  const hotelCost = props.hotel.price_per_day * hotelDays;
  const flightCost = props.event?.flight_price || 0;

  return hotelCost + flightCost;
});

const totalCost = computed(() => {
  let total = basePrice.value;

  if (totalPeople.value > 1) {
    total = total * totalPeople.value;
  }

  if (state.meal_plan !== "none") {
    const mealPlanPrices = {
      breakfast: 150,
      half_board: 450,
      all_inclusive: 850,
    };
    const availableDate = props.hotel.available_dates.find(
      (date: { date: string }) => date.date === state.start_date
    );
    if (availableDate) {
      const totalTripDays = Math.ceil(
        (new Date(availableDate.arrival_home_day).getTime() -
          new Date(availableDate.date).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const hotelDays = totalTripDays - availableDate.days_before_hotel * 2;
      total += mealPlanPrices[state.meal_plan] * hotelDays * totalPeople.value;
    }
  }

  if (state.cancellation_protection) {
    total += 500;
  }

  return total;
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const bookingStore = useBookingStore();

const submitBooking = async () => {
  await withLoading(async () => {
    const startDate = new Date(state.start_date);
    const endDate = new Date(state.end_date);
    const numberOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    try {
      const totalPeople = state.adults + state.children;
      const mealPlanPrices = {
        none: 0,
        breakfast: 150,
        half_board: 450,
        all_inclusive: 850,
      };

      const hotelCost = props.hotel.price_per_day * numberOfDays;
      const mealPlanCost =
        mealPlanPrices[state.meal_plan] * totalPeople * numberOfDays;

      const cancellationCost = state.cancellation_protection ? 500 : 0;
      const totalCost = hotelCost + mealPlanCost + cancellationCost;

      try {
        // Add booking to store
        bookingStore.addBooking({
          eventId: props.event?.id || "",
          eventTitle: props.event?.title || props.hotel.name,
          startDate: state.start_date,
          endDate: state.end_date,
          adults: state.adults,
          children: state.children,
          mealPlan: state.meal_plan,
          name: state.name,
          email: state.email,
          flightIncluded: state.flight_back_and_forth,
          cancellationProtection: state.cancellation_protection,
          totalCost,
        });

        snackbar.add({
          type: "success",
          text: "Your booking has been confirmed!",
        });
        Object.assign(state, {
          start_date: "",
          end_date: "",
          adults: 1,
          children: 0,
          meal_plan: "none",
          cancellation_protection: false,
          name: "",
          email: "",
          flight_back_and_forth: false,
        });

        if (form.value) {
          form.value.reset();
        }

        isOpen.value = false;
      } catch (error) {
        console.error("Error submitting booking:", error);
        snackbar.add({
          type: "error",
          text: "Some error happened while booking, try again later!",
        });
      }
    } catch (error) {
      console.error("Error calculating booking details:", error);
    }
  });
};
watch(
  () => props.selectedDates,
  (newDates) => {
    if (newDates.start_date && newDates.end_date) {
      state.start_date = newDates.start_date;
      state.end_date = newDates.end_date;
      isOpen.value = true;
    }
  },
  { immediate: true }
);
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        {{ hotel?.name || "Trip" }}
      </template>
      <form ref="form">
        <UForm :state="state" :schema="schema" @submit.prevent="submitBooking">
          <div class="flex gap-4 mb-4">
            <UFormGroup label="Start Date" :required="true" name="start_date">
              <UInput type="date" v-model="state.start_date" disabled />
            </UFormGroup>
            <UFormGroup label="End Date" :required="true" name="end_date">
              <UInput type="date" v-model="state.end_date" disabled />
            </UFormGroup>
          </div>

          <div class="flex gap-4 mb-4">
            <UFormGroup label="Number of Adults" :required="true" name="adults">
              <UInput
                class="max-w-[179px]"
                type="number"
                min="1"
                :value="state.adults"
                v-model.number="state.adults"
              />
            </UFormGroup>
            <UFormGroup label="Number of Children" name="children">
              <UInput
                class="max-w-[179px]"
                type="number"
                min="0"
                :value="state.children"
                v-model.number="state.children"
              />
            </UFormGroup>
          </div>

          <UFormGroup
            label="Meal Plan"
            name="meal_plan"
            :required="true"
            class="mb-4"
          >
            <USelect
              v-model="state.meal_plan"
              :options="[
                { label: 'Room Only', value: 'none' },
                { label: 'Breakfast (+150 $/person/day)', value: 'breakfast' },
                {
                  label: 'Half Board (+450 $/person/day)',
                  value: 'half_board',
                },
                {
                  label: 'All Inclusive (+850 $/person/day)',
                  value: 'all_inclusive',
                },
              ]"
            />
          </UFormGroup>

          <UFormGroup
            label="Name of Booker"
            :required="true"
            name="name"
            class="mb-4"
          >
            <UInput placeholder="Your name" v-model="state.name" />
          </UFormGroup>

          <UFormGroup
            label="Email Address"
            :required="true"
            name="email"
            class="mb-4"
          >
            <UInput
              type="email"
              placeholder="Your email"
              v-model="state.email"
            />
          </UFormGroup>

          <UFormGroup
            label="Cancellation Protection"
            name="cancellation_protection"
            class="mb-4"
          >
            <UCheckbox v-model="state.cancellation_protection" label="$ +500" />
          </UFormGroup>

          <div class="flex justify-between">
            <p>Total: ${{ totalCost }}</p>
            <UButton
              type="submit"
              color="green"
              variant="solid"
              label="Book now"
              :loading="isLoading"
              :disabled="isLoading"
            />
          </div>
        </UForm>
      </form>
    </UCard>
  </UModal>
</template>
