<script setup lang="ts">
import { z } from "zod";
import { usePackageBookingStore } from "~/stores/packageBookingStore";

const {
  modelValue,
  packageData,
  eventData,
  numAdults,
  numChildren,
  availableDatesIndex,
  totalPrice,
} = defineProps<{
  modelValue: boolean;
  packageData: any;
  eventData: any;
  numAdults: number;
  numChildren: number;
  availableDatesIndex: number;
  totalPrice: number;
}>();

const { addPackageBooking } = usePackageBookingStore();
const router = useRouter();

const form = ref<HTMLFormElement | null>(null);

const emit = defineEmits(["update:modelValue"]);
const isOpen = computed({
  get: () => modelValue,
  set: (value) => emit("update:modelValue", value),
});

const state = reactive({
  name: "",
  email: "",
});

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
});

const handleClose = () => {
  isOpen.value = false;
  state.name = "";
  state.email = "";
};

const submit = () => {
  addPackageBooking({
    startDate:
      eventData.hotels[packageData.hotelId - 1].available_dates[
        availableDatesIndex
      ].date,
    endDate:
      eventData.hotels[packageData.hotelId - 1].available_dates[
        availableDatesIndex
      ].arrival_home_day,
    package: packageData.name,
    event: eventData.title,
    hotel: eventData.hotels[packageData.hotelId - 1].name,
    activity: packageData.activity.name,
    mealPlan: packageData.mealPlan,
    flightIncluded: packageData.flightIncluded,
    cancellationProtection: false,
    totalPrice: totalPrice,
    numAdults: numAdults,
    numChildren: numChildren,
    name: state.name,
    email: state.email,
  });

  isOpen.value = false;
  state.name = "";
  state.email = "";

  router.push("/booking");
};
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      Confirm Package Booking
      <p>{{ `Booking for: ${packageData.name}` }}</p>
      <UForm ref="form" :state="state" :schema="schema" @submit="submit">
        <div class="p-4">
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
          <UFormGroup>
            <span class="flex flex-row justify-between">
              <UButton type="submit">Submit</UButton>
              <UButton @click="handleClose">Cancel</UButton>
            </span>
          </UFormGroup>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
