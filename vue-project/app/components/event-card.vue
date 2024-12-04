<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>
    <img :src="image" alt="" />
    <template #footer>
      <div class="space-y-4">
        <p>{{ description }}</p>
        <div class="flex justify-end">
          <RoundButton @click="$emit('register')"> Register </RoundButton>
        </div>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
defineProps({
  title: String,
  when: String,
  image: String,
  description: String,
});

defineEmits(["register"]);
</script>

<style scoped></style>
