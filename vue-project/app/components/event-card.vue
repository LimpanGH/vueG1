<template>
  <UCard>
    <template #header>
      <NuxtLink :to="`/events/${label}`">
        <img
          class="min-h-[350px] max-h-[350px] w-full object-cover"
          :src="image"
          :alt="title"
        />
      </NuxtLink>
    </template>

    <template #footer>
      <div class="space-y-4">
        <h2 class="text-xl font-medium">{{ title }}</h2>
        <p>{{ description }}</p>
        <div class="flex justify-end">
          <RoundButton @click="$emit('register')"> Register </RoundButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup>
defineProps({
  title: String,
  when: String,
  image: String,
  description: String,
  label: String,
});

defineEmits(["register"]);
</script>

<style scoped></style>
