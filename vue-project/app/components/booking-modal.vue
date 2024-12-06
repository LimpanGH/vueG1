<script setup lang="ts">
import { z } from "zod";

const props = defineProps<{
  modelValue: boolean;
  hotel: Hotel;
  event?: Event;
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

const totalCost = computed(() => {
  // Steg 1: Kontrollera om datum är valda och beräkna antal dagar
  if (!state.start_date || !state.end_date) return 0;
  const startDate = new Date(state.start_date);
  const endDate = new Date(state.end_date);
  const numberOfDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Steg 2: Beräkna baskostnad för hotellet
  let totalCost = props.hotel.price_per_day * numberOfDays;

  // Steg 3: Beräkna kostnad baserat på antal personer
  const totalPeople = state.adults + state.children;
  if (totalPeople > 0) {
    // Steg 4: Lägg till måltidskostnader om valda
    const mealPlanPrices = {
      none: 0,
      breakfast: 150,
      half_board: 450,
      all_inclusive: 850,
    };

    if (state.meal_plan !== "none") {
      const mealCost =
        mealPlanPrices[state.meal_plan] * totalPeople * numberOfDays;
      totalCost += mealCost;
    }

    // Steg 5: Lägg till flygkostnad om vald
    if (state.flight_back_and_forth && props.event?.flight_price) {
      const flightCost = props.event.flight_price * totalPeople;
      totalCost += flightCost;
    }
  }

  // Steg 6: Lägg till avbokningsskydd om valt
  if (state.cancellation_protection) {
    totalCost += 500;
  }

  return totalCost;
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const submitBooking = () => {
  const startDate = new Date(state.start_date);
  const endDate = new Date(state.end_date);
  const numberOfDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

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
  const flightCost = state.flight_back_and_forth
    ? (props.event?.flight_price ?? 0) * totalPeople
    : 0;
  const cancellationCost = state.cancellation_protection ? 500 : 0;

  console.log("Bokningsdetaljer:", {
    hotellKostnad: hotelCost,
    måltidsKostnad: mealPlanCost,
    flygKostnad: flightCost,
    avbokningsskydd: cancellationCost,
    totalKostnad: hotelCost + mealPlanCost + flightCost + cancellationCost,
    antalDagar: numberOfDays,
    antalPersoner: totalPeople,
  });
};
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
              <UInput type="date" v-model="state.start_date" />
            </UFormGroup>
            <UFormGroup label="End Date" :required="true" name="end_date">
              <UInput type="date" v-model="state.end_date" />
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
            label="Flight back and forth"
            name="flight_back_and_forth"
            class="mb-4"
          >
            <UCheckbox
              v-model="state.flight_back_and_forth"
              :label="`+${event?.flight_price || 0} $`"
            />
          </UFormGroup>

          <UFormGroup
            label="Cancellation Protection"
            name="cancellation_protection"
            class="mb-4"
          >
            <UCheckbox v-model="state.cancellation_protection" label="+500 $" />
          </UFormGroup>

          <div class="flex justify-between">
            <p>Total: {{ totalCost }} $</p>
            <UButton
              type="submit"
              color="green"
              variant="solid"
              label="Book now"
            />
          </div>
        </UForm>
      </form>
    </UCard>
  </UModal>
</template>
