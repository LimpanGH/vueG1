<template>
	<section class="space-y-8">
		<article
			v-for="article in articles"
			:key="article.id"
			class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md"
		>
			<NuxtLink :to="`/blogs/${article.id}`">
				<img
					:src="article.image"
					:alt="article.title"
					class="object-cover max-h-[400px] rounded-lg max-w-[350px]"
				/>
				<h2 class="text-2xl font-bold mb-4 mt-5">{{ article.title }}</h2>
				<p>{{ article.description }}</p>
			</NuxtLink>
		</article>
	</section>
</template>

<script setup>
import { ref } from 'vue';

const articles = ref([
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
]);
</script>

<style scoped>
article {
	transition: transform 0.3s ease;
}
article:hover {
	transform: scale(1.05);
}
img {
	transition: transform 0.3s ease;
}
img:hover {
	transform: scale(1.05);
}
</style>
