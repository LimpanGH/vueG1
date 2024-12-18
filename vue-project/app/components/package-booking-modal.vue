<script setup lang="ts">
import { z } from "zod";

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
};

const submit = () => {
  console.log("name", state.name);
  console.log("email", state.email);
  console.log("adults", numAdults);
  console.log("children", numChildren);
  console.log("dateIndex", availableDatesIndex);
  console.log("price", totalPrice);
  console.log("package", packageData);
  console.log("event", eventData);

  //TODO: send data

  //TODO: navigate to checkout

  isOpen.value = false;
  state.name = "";
  state.email = "";
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
