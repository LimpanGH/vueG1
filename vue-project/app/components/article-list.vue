<template>
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<article
			v-for="article in articles"
			:key="article.id"
			class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
		>
			<NuxtLink :to="`/blogs/${article.id}`">
				<img
					:src="article.image"
					:alt="article.title"
					class="object-contain h-40 rounded-lg w-full mb-4"
				/>
				<h2 class="text-lg font-semibold mb-2">{{ article.title }}</h2>
				<p class="text-gray-700 dark:text-gray-300 text-sm">
					{{ article.description }}
				</p>
			</NuxtLink>
		</article>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Article {
	id: number;
	title: string;
	description: string;
	content: string;
	image: string;
}

const articles = ref<Article[]>([
	{
		id: 1,
		title: 'Linus Johannesson: Unforgettable Space Journeys',
		description: 'Experience the tranquility of the Moon...',
		content: `Ever wondered what it would be like to take a stroll on the moon? Imagine bouncing around in slow motion, like an astronaut on a trampoline! And don't forget to bring a picnic – the moon is, after all, the best place for a cheese and crackers party! 🧀🌌

But wait, it gets better! Next stop: Mars! 🪐 Here, you can try your hand at growing potatoes in space, just like Matt Damon in "The Martian." Just watch out for those pesky Martians who are always trying to steal your crops! 👽🥔

And for the ultimate space experience, why not take a ride through Saturn's rings? 🎢 It's like a roller coaster, but with more stars and less gravity. Just hold onto your hat, because it's going to be a wild ride! 🎩✨

So pack your bags, buckle up, and get ready for an adventure that's truly out of this world! 🌠`,
		image: 'https://avatars.githubusercontent.com/u/108390176?v=4',
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
	},
	{
		id: 3,
		title: 'Andy Cheung: Eco-Friendly Space Travel',
		description: 'At SpAIce, we prioritize sustainability...',
		content: `Ready to explore the cosmos while keeping our universe green? At SpAIce, we're committed to eco-friendly space travel! Imagine soaring through the stars in our state-of-the-art, solar-powered spacecraft. 🌞🚀

Our ships are designed with the latest green technology, ensuring that your journey leaves no carbon footprint. 🌍✨ From recycling systems that turn waste into energy to sustainable food sources grown on board, every detail is crafted with the environment in mind. ♻️🌱

While you're enjoying the view of Earth from orbit, you can also participate in our space gardening program. Help us grow fresh produce in zero gravity – it's fun, educational, and delicious! 🥗🌌

And don't miss our eco-tours of the asteroid belt, where you can learn about space mining and how we can harvest resources responsibly. It's an adventure that combines excitement with sustainability! 🪐🌠

Join us at SpAIce and be a part of the future of green space travel. Together, we can explore the universe while protecting our precious home planet. 🌍💚`,
		image:
			'https://media.licdn.com/dms/image/v2/D5603AQHmH67SQ5UOPg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709223535383?e=1738800000&v=beta&t=2btRgnDZg_6NS5t8tL9Wm4YsIwGKTqqKi6-EQba1evc',
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
			'https://media.licdn.com/dms/image/v2/D5635AQF35MIkoL01Eg/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1719445108992?e=1734454800&v=beta&t=1OJxe2JiUtD_mY5fPgFid4wdvkz-VYX9MwnALqTtO1c',
	},
	{
		id: 5,
		title: 'Leila Kheirandish: Eco-Friendly Space Travel',
		description: 'At SpAIce, we prioritize sustainability...',
		content: `Ready to explore the cosmos while keeping our universe green? At SpAIce, we're committed to eco-friendly space travel! Imagine soaring through the stars in our state-of-the-art, solar-powered spacecraft. 🌞🚀

Our ships are designed with the latest green technology, ensuring that your journey leaves no carbon footprint. 🌍✨ From recycling systems that turn waste into energy to sustainable food sources grown on board, every detail is crafted with the environment in mind. ♻️🌱

While you're enjoying the view of Earth from orbit, you can also participate in our space gardening program. Help us grow fresh produce in zero gravity – it's fun, educational, and delicious! 🥗🌌

And don't miss our eco-tours of the asteroid belt, where you can learn about space mining and how we can harvest resources responsibly. It's an adventure that combines excitement with sustainability! 🪐🌠

Join us at SpAIce and be a part of the future of green space travel. Together, we can explore the universe while protecting our precious home planet. 🌍💚`,
		image: 'https://avatars.githubusercontent.com/u/81739933?v=4',
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
	border-radius: 0.75rem; /* Tailwind CSS equivalent of rounded-lg */
}
img:hover {
	transform: scale(1.05);
}
</style>
