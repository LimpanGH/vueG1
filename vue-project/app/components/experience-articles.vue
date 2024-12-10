<template>
	<section class="space-y-8">
		<article class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
			<img
				src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&auto=format&fit=crop&ixlib=rb-1.2.1&auto=format&crop=faces&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9ja2V0fGVufDB8fDB8fHww"
				alt="blogg dimage"
				class="object-cover max-h-[400px] rounded-lg max-w-[350px]"
			/>
			<h2 class="text-2xl font-bold mb-4">Unforgettable Space Journeys</h2>
			<p>
				Experience the tranquility of the Moon, the breathtaking storms of
				Jupiter, and the mysteries of Atlantis. Our space journeys offer a
				unique blend of adventure and relaxation, ensuring an unforgettable
				experience.
			</p>
		</article>
		<article class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
			<img
				src="https://media.licdn.com/dms/image/v2/D5603AQHmH67SQ5UOPg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709223535383?e=1738800000&v=beta&t=2btRgnDZg_6NS5t8tL9Wm4YsIwGKTqqKi6-EQba1evc"
				alt="Captain Andy"
				class="object-cover max-h-[400px] rounded-lg max-w-[350px]"
			/>
			<h2 class="text-2xl font-bold mb-4">Eco-Friendly Space Travel</h2>
			<p>
				At SpAIce, we prioritize sustainability. Our spacecraft are powered by
				green technologies, allowing you to explore the stars with a clear
				conscience. Join us in pioneering eco-friendly space tourism.
			</p>
		</article>
		<article class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
			<img
				src="https://avatars.githubusercontent.com/u/133894488?v=4"
				alt="Captain Andy"
				class="object-cover max-h-[400px] rounded-lg max-w-[350px]"
			/>
			<h2 class="text-2xl font-bold mb-4">Luxury and Comfort</h2>
			<p>
				Our space hotels offer top-notch amenities and services. From the Crater
				View Lodge on the Moon to the Olympus Mons Retreat on Mars, enjoy luxury
				and comfort in the most extraordinary locations.
			</p>
		</article>
	</section>
</template>

<script setup lang="ts"></script>

<style scoped>
article {
	transition: transform 0.3s ease;
}
article:hover {
	transform: scale(1.03);
}
img {
	transition: transform 0.3s ease;
}
img:hover {
	transform: scale(1.05);
}
</style>
