<template>
	<SectionCard>
		<div class="flex justify-between">
			<div class="flex space-x-2">
				<div>{{ title }}</div>
				<div>{{ status }}</div>
			</div>
			<RoundButton variant="danger" @click="$emit('cancelled')"
				>Cancel</RoundButton
			>
		</div>
	</SectionCard>
</template>

<script setup>
defineProps({
	title: String,
	status: String,
});

defineEmits('cancelled');
</script>

<style scoped></style>
