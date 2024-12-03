<template>
	<SectionCard>
		<div class="flex justify-between">
			<div>{{ title }}</div>
			<RoundButton variant="danger">Cancel</RoundButton>
		</div>
	</SectionCard>
</template>

<script setup lang="ts">
defineProps({
	title: String,
});
</script>

<style scoped></style>
