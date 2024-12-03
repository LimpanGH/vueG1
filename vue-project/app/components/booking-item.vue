<template>
	<SectionCard>
		<div class="flex justify-between">
			<div>{{ title }}</div>
			<RoundButton @click="$emit('delete')" variant="danger"
				>Cancel</RoundButton
			>
		</div>
	</SectionCard>
</template>

<script setup lang="ts">
defineProps({
	title: String,
});

defineEmits(['delete']);
</script>

<style scoped></style>
