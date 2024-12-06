<template>
  <UModal v-model="isOpen">
    <UCard>
      <template class="text-center" #header>
        {{ hotel?.name || "Trip" }}
      </template>
      <form ref="form">
        <UForm :state="state" :schema="schema" @submit.prevent="submitBooking">
          <!-- Travel dates -->
          <div class="flex gap-4 mb-4">
            <UFormGroup
              class="min-w-[179px]"
              label="Start Date"
              :required="true"
              name="start_date"
            >
              <UInput type="date" v-model="state.start_date" />
            </UFormGroup>
            <UFormGroup
              class="min-w-[179px]"
              label="End Date"
              :required="true"
              name="end_date"
            >
              <UInput type="date" v-model="state.end_date" />
            </UFormGroup>
          </div>

          <!-- Number of people -->
          <div class="flex gap-4 mb-4">
            <UFormGroup label="Number of Adults" :required="true" name="adults">
              <UInput
                class="max-w-[179px]"
                type="number"
                min="1"
                v-model.number="state.adults"
              />
            </UFormGroup>
            <UFormGroup label="Number of Children" name="children">
              <UInput
                class="max-w-[179px]"
                type="number"
                min="0"
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
                { label: 'Room Only', value: 'none', price: 0 },
                {
                  label: 'Breakfast (+150 $/person/day)',
                  value: 'breakfast',
                  price: 150,
                },
                {
                  label: 'Half Board (+450 $/person/day)',
                  value: 'half_board',
                  price: 450,
                },
                {
                  label: 'All Inclusive (+850 $/person/day)',
                  value: 'all_inclusive',
                  price: 850,
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
            <UCheckbox v-model="state.cancellation_protection" label="+500 $">
            </UCheckbox>
          </UFormGroup>
          <UButton
            type="submit"
            color="black"
            variant="solid"
            label="Book Now"
          />
        </UForm>
      </form>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";

const form = ref<HTMLFormElement | null>(null);
const props = defineProps({
  modelValue: Boolean,
  hotel: {
    type: Object,
    default: null,
  },
  event: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);
console.log("Event data in modal:", props.event);

// Zod validation schema for form fields
const schema = z.object({
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  adults: z.number().min(1, "At least one adult is required"),
  children: z.number().optional(),
  meal_plan: z.enum(["none", "breakfast", "half_board", "all_inclusive"], {
    errorMap: () => ({ message: "Meal plan selection is required" }),
  }),
  flight_back_and_forth: z.boolean().optional(),
  cancellation_protection: z.boolean().optional(),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Please provide a valid email address"),
});

interface State {
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  meal_plan: "none" | "breakfast" | "half_board" | "all_inclusive";
  cancellation_protection: boolean;
  name: string;
  email: string;
  flight_back_and_forth: boolean;
}

const initialState: State = {
  start_date: "",
  end_date: "",
  adults: 1,
  children: 0,
  meal_plan: "none",
  cancellation_protection: false,
  name: "",
  email: "",
  flight_back_and_forth: false,
};

const state = ref<State>({ ...initialState });

const resetForm = () => {
  Object.assign(state.value, initialState);
  form.value?.clear?.();
};

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm();
    emit("update:modelValue", value);
  },
});

const submitBooking = () => {
  console.log("Booking data:", {
    ...state.value,
    hotel: props.hotel,
    hotel_id: props.hotel?.id,
    price_per_day: props.hotel?.price_per_day,
  });
};
</script>
