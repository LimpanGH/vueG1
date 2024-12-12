<template>
  <NuxtLayout>
    <div class="py-8">
      <div class="mt-7 card max-w-sm mx-auto text-center h-[400px]">
        <div class="mt-7 text-7xl font-bold">
          {{ error?.statusCode }}
        </div>
        <div class="mt-7 text-6xl">Ooops.</div>
        <p class="mt-7 mb-4">{{ error?.message }}</p>
        <NuxtLink class="btn" to="/">&larr; Back home</NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError();
</script>
