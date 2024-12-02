<template>
  <section>
    <BookingModal v-model="isOpen" />
    <UButton
      icon="i-heroicons-plus-circle"
      color="white"
      variant="solid"
      label="Boka nu!"
      @click="isOpen = true"
    />
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <!-- <ExperienceCard /> -->
  </section>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>

<style scoped></style>
