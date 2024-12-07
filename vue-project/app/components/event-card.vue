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
        <div class="flex justify-between">
          <UButton
            icon="i-heroicons-bookmark"
            size="sm"
            color="white"
            variant="solid"
            @click="$emit('register')"
          >
            Monitor Event
          </UButton>
          <NuxtLink :to="`/events/${label}`">
            <UButton
              :color="getBadgeColor(label)"
              icon="i-heroicons-home-modern"
              size="sm"
              variant="solid"
            >
              See all {{ label }} hotels
            </UButton></NuxtLink
          >
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

const { getBadgeColor } = useEvents();

defineEmits(["register"]);
</script>

<style scoped></style>
