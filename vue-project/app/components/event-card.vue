<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>
    <img :src="image" alt="" />
    <template #footer>
      <div class="space-y-4">
		  <!-- <div class="flex justify-end"> -->
		  <div class="grid grid-cols-2 grid-rows-2 gap-4 ">
			  <p>{{ description }}</p>
			  <p></p>
			  <div>
			  <p class="text-black" >5days</p>
			  <p class="text-black" >10 Jan. - 15 Jan.</p>

			</div>
			  <p class= "text-red-600 font-bold text-end justify-end" >{{ price }} $</p>
			  <!-- <RoundButton @click="$emit('register')"> Register </RoundButton> -->
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
  price: String,
});

defineEmits(['register']);
</script>

<style scoped></style>
