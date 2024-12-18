<template>
	<section class="container mx-auto my-8 p-4">
		<article class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
			<img
				:src="article?.image"
				:alt="article?.title"
				class="object-contain h-60 rounded-lg w-full mb-4"
			/>
			<h1 class="text-3xl font-semibold mb-4">{{ article?.title }}</h1>
			<p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
				Postat den {{ article?.date }} av {{ article?.author }}
			</p>
			<p class="text-gray-700 dark:text-gray-300 text-lg">
				{{ displayedContent }}
			</p>
		</article>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Article {
	id: number;
	title: string;
	description: string;
	content: string;
	image: string;
	date: string;
	author: string;
}

const route = useRoute();
const article = ref<Article | null>(null);
const displayedContent = ref('');
const typingInterval = 5;

const articles = [
	{
		id: 1,
		title: 'Linus Johannesson: Unforgettable Space Journeys',
		description: 'Experience the tranquility of the Moon...',
		content: `Ever wondered what it would be like to take a stroll on the moon? Imagine bouncing around in slow motion, like an astronaut on a trampoline! And don't forget to bring a picnic – the moon is, after all, the best place for a cheese and crackers party! 🧀🌌

But wait, it gets better! Next stop: Mars! 🪐 Here, you can try your hand at growing potatoes in space, just like Matt Damon in "The Martian." Just watch out for those pesky Martians who are always trying to steal your crops! 👽🥔

And for the ultimate space experience, why not take a ride through Saturn's rings? 🎢 It's like a roller coaster, but with more stars and less gravity. Just hold onto your hat, because it's going to be a wild ride! 🎩✨

So pack your bags, buckle up, and get ready for an adventure that's truly out of this world! 🌠`,
		image: 'https://avatars.githubusercontent.com/u/108390176?v=4',
		date: '27 oktober, 2024',
		author: 'Linus Johannesson',
	},
	{
		id: 2,
		title: 'William Boström: Luxury and Comfort',
		description: 'Our space hotels offer top-notch amenities...',
		content: `Ever dreamed of a vacation that's truly out of this world? Our space hotels are here to make that dream a reality! Imagine waking up to a breathtaking view of Earth from your luxurious suite. 🌍✨

Start your day with a zero-gravity yoga session – it's the ultimate way to stretch and relax while floating effortlessly. 🧘‍♀️🌌 Afterward, enjoy a gourmet breakfast prepared by our top chefs, featuring delicacies from across the galaxy. 🍽️🌠

Feeling adventurous? Take a spacewalk and experience the thrill of floating in the vastness of space. Don't forget to snap a selfie with the Milky Way as your backdrop! 📸🌌

In the evening, unwind at our stellar spa, where you can indulge in treatments that are out of this world. From meteorite massages to stardust facials, you'll leave feeling rejuvenated and glowing. 🌟💆‍♂️

So why wait? Book your stay at our space hotel and experience luxury and comfort like never before. Your adventure among the stars awaits! 🌠`,
		image: 'https://avatars.githubusercontent.com/u/133894488?v=4',
		date: '3 december, 2024',
		author: 'William Boström',
	},
	{
		id: 3,
		title: 'Andy Cheung: Eco-Friendly Space Travel',
		description: 'Eager to explore the universe...',
		content: `Eager to explore the universe while protecting our cosmic environment? At GreenOrbit, we're leading the way in eco-friendly space journeys! Imagine traveling through the galaxy in our state-of-the-art, solar-powered spacecraft. 🌞🚀 Our ships are equipped with the latest green technology, ensuring your adventure leaves no environmental footprint. 🌍✨ From innovative waste recycling systems to onboard aquaponic gardens that provide fresh food, every detail is designed with sustainability in mind. ♻️🌱

As you marvel at the beauty of space, you can also join our stellar conservation projects. Help us safeguard celestial bodies and promote sustainable space exploration – it's exciting, educational, and impactful! 🌌🌟 Don't miss our eco-tours of the rings of Saturn, where you can learn about responsible resource management and the importance of preserving these magnificent structures. It's an adventure that blends thrill with environmental care! 🪐✨

Join us at GreenOrbit and be part of the future of eco-friendly space journeys. Together, we can explore the universe while protecting our precious cosmic environments. 🌍💚`,
		image:
			'https://media.licdn.com/dms/image/v2/D5603AQHmH67SQ5UOPg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709223535383?e=1738800000&v=beta&t=2btRgnDZg_6NS5t8tL9Wm4YsIwGKTqqKi6-EQba1evc',
		date: '10 december, 2024',
		author: 'Andy Cheung',
	},
	{
		id: 4,
		title: 'Alex Hansen: Eco-Friendly Space Travel',
		description: 'At SpAIce, we prioritize sustainability...',
		content: `Ready to explore the cosmos while keeping our universe green? At SpAIce, we're committed to eco-friendly space travel! Imagine soaring through the stars in our state-of-the-art, solar-powered spacecraft. 🌞🚀

Our ships are designed with the latest green technology, ensuring that your journey leaves no carbon footprint. 🌍✨ From recycling systems that turn waste into energy to sustainable food sources grown on board, every detail is crafted with the environment in mind. ♻️🌱

While you're enjoying the view of Earth from orbit, you can also participate in our space gardening program. Help us grow fresh produce in zero gravity – it's fun, educational, and delicious! 🥗🌌

And don't miss our eco-tours of the asteroid belt, where you can learn about space mining and how we can harvest resources responsibly. It's an adventure that combines excitement with sustainability! 🪐🌠

Join us at SpAIce and be a part of the future of green space travel. Together, we can explore the universe while protecting our precious home planet. 🌍💚`,
		image:
			'https://media.licdn.com/dms/image/v2/D4D03AQH8mIDzhvsw1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715969101998?e=1740009600&v=beta&t=jOcIrVZs1XykcYB7-uSuf-nnlMj982Hkqleymj153qg',
		date: '15 december, 2024',
		author: 'Alex Hansen',
	},
	{
		id: 5,
		title: 'Leila Kheirandish: Eco-Friendly Space Travel',
		description: 'Dreaming of venturing into the cosmos...',
		content: `Dreaming of venturing into the cosmos while keeping our universe pristine? At StarEco, we're pioneering green galactic adventures! Picture yourself navigating the stars in our innovative, solar-powered starships. 🌞🚀 Our fleet is outfitted with the latest sustainable technology, ensuring your voyage leaves no carbon footprint. 🌍✨ From cutting-edge waste-to-energy systems to onboard vertical farms that supply fresh produce, every feature is crafted with the environment in mind. ♻️🌱

As you explore the vastness of space, you can also participate in our interstellar conservation initiatives. Join us in protecting distant planets and promoting ethical space exploration – it's fascinating, educational, and impactful! 🌌🌠 Don't miss our eco-friendly tours of the Kuiper Belt, where you can learn about sustainable resource utilization and the importance of preserving these untouched regions. It's an adventure that combines thrill with environmental responsibility! 🪐✨

Join us at StarEco and be a part of the future of green galactic adventures. Together, we can explore the universe while safeguarding our precious cosmic habitats. 🌍💚`,
		image: 'https://avatars.githubusercontent.com/u/81739933?v=4',
		date: '20 december, 2024',
		author: 'Leila Kheirandish',
	},
];

onMounted(() => {
	const articleId = parseInt(route.params.id as string, 10);
	article.value = articles.find((a) => a.id === articleId) || null;
});

watch(article, (newArticle) => {
	if (newArticle) {
		let index = 0;
		displayedContent.value = '';
		const interval = setInterval(() => {
			if (index < newArticle.content.length) {
				displayedContent.value += newArticle.content[index];
				index++;
			} else {
				clearInterval(interval);
			}
		}, typingInterval);
	}
});
</script>

<style scoped>
.container {
	max-width: 800px;
}
</style>
