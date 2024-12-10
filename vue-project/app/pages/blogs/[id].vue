<template>
	<div class="container mx-auto my-8">
		<div v-if="article" class="space-y-8">
			<h1 class="text-4xl font-medium">{{ article.title }}</h1>
			<img
				:src="article.image"
				:alt="article.title"
				class="object-cover max-h-[400px] rounded-lg max-w-[350px]"
			/>
			<p>{{ article.description }}</p>
		</div>
		<div v-else class="text-center text-gray-500">Loading...</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const article = ref(null);

const articles = [
	{
		id: 1,
		title: 'Unforgettable Space Journeys',
		description: 'Experience the tranquility of the Moon...',
		image: 'https://avatars.githubusercontent.com/u/108390176?v=4',
	},
	{
		id: 2,
		title: 'Luxury and Comfort',
		description: 'Our space hotels offer top-notch amenities...',
		image: 'https://avatars.githubusercontent.com/u/133894488?v=4',
	},
	{
		id: 3,
		title: 'Eco-Friendly Space Travel',
		description: 'At SpAIce, we prioritize sustainability...',
		image: 'https://avatars.githubusercontent.com/u/108390176?v=4',
	},
];

onMounted(() => {
	const articleId = parseInt(route.params.id, 10);
	article.value = articles.find((a) => a.id === articleId);
});
</script>

<style scoped>
.container {
	max-width: 800px;
}
</style>
