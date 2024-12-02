<template>
  <UModal v-model="isOpen">
    <UCard>
      <template class="text-center" #header> Boka Resa </template>
      <form>
        <UForm
          :state="state"
          :schema="schema"
          ref="form"
          @submit.prevent="submitBooking"
        >
          <!-- Datum för resa -->
          <div class="flex gap-4 mb-4">
            <UFormGroup
              class="min-w-[179px]"
              label="Startdatum"
              :required="true"
              name="start_date"
            >
              <UInput type="date" v-model="state.start_date" />
            </UFormGroup>
            <UFormGroup
              class="min-w-[179px]"
              label="Slutdatum"
              :required="true"
              name="end_date"
            >
              <UInput type="date" v-model="state.end_date" />
            </UFormGroup>
          </div>

          <!-- Antal personer -->
          <div class="flex gap-4 mb-4">
            <UFormGroup label="Antal vuxna" :required="true" name="adults">
              <UInput type="number" min="1" v-model.number="state.adults" />
            </UFormGroup>
            <UFormGroup label="Antal barn" name="children">
              <UInput type="number" min="0" v-model.number="state.children" />
            </UFormGroup>
          </div>

          <!-- Lägg till person -->
          <div class="mb-4">
            <UButton
              type="button"
              color="primary"
              variant="solid"
              label="Lägg till person"
              @click="addPerson"
            />
            <div
              v-for="(person, index) in state.persons"
              :key="index"
              class="flex gap-4 mt-2"
            >
              <UFormGroup
                label="Ålder"
                :required="true"
                :name="`person_age_${index}`"
              >
                <UInput type="number" min="0" v-model.number="person.age" />
              </UFormGroup>
            </div>
          </div>

          <!-- Avbokningsskydd -->
          <UFormGroup
            label="Avbokningsskydd"
            name="cancellation_protection"
            class="mb-4"
          >
            <UCheckbox v-model="state.cancellation_protection" label="+100 SEK">
            </UCheckbox>
          </UFormGroup>

          <UFormGroup
            label="Beställarens namn"
            :required="true"
            name="name"
            class="mb-4"
          >
            <UInput placeholder="Ditt namn" v-model="state.name" />
          </UFormGroup>
          <UFormGroup
            label="E-postadress"
            :required="true"
            name="email"
            class="mb-4"
          >
            <UInput
              type="email"
              placeholder="Din e-post"
              v-model="state.email"
            />
          </UFormGroup>
          <UButton
            type="submit"
            color="black"
            variant="solid"
            label="Boka nu"
          />
        </UForm>
      </form>
    </UCard>
  </UModal>
</template>

<script setup>
import { ref, computed } from "vue";
import { z } from "zod";

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const schema = z.object({
  start_date: z.string().min(1, "Startdatum är obligatoriskt"),
  end_date: z.string().min(1, "Slutdatum är obligatoriskt"),
  adults: z.number().min(1, "Minst en vuxen måste delta"),
  adults: z.number().min(1, "Minst en vuxen måste delta"),
  children: z.number().optional(),
  persons: z
    .array(
      z.object({
        age: z.number().min(0, "Ålder måste vara minst 0"),
      })
    )
    .optional(),
  cancellation_protection: z.boolean().optional(),
  name: z.string().nonempty("Namn är obligatoriskt"),
  email: z.string().email("Ange en giltig e-postadress"),
});

const initialState = {
  start_date: "",
  end_date: "",
  adults: 1,
  children: 0,
  persons: [],
  cancellation_protection: false,
  name: "",
  email: "",
};
const state = ref({ ...initialState });

const addPerson = () => {
  state.value.persons.push({ age: null });
};

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
  // Validera och spara bokningen
  console.log("Bokningsdata:", state.value);
};
</script>
