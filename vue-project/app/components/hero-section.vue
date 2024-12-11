<template>
	<div class="relative">
		<video
			class="max-h-[600px] w-full object-cover"
			src="/hero-bg.mp4"
			autoplay
			loop
			muted
			playsinline
		></video>
		<div class="absolute inset-0">
			<div
				class="flex flex-col justify-center pl-4 sm:pl-4 md:pl-8 gap-5 h-[100%]"
			>
				<h1 class="text-4xl md:text-6xl lg:text-8xl font-bold text-white">
					Discover the <br />
					Impossible
				</h1>
				<p class="text-white">
					Space, myths, and mysteries – all just a trip away.
				</p>
				<div class="flex gap-3">
					<NuxtLink to="/blogs">
						<UButton
							icon="i-heroicons-rocket-launch"
							size="sm"
							color="white"
							variant="solid"
							label="Find out more"
							:trailing="false"
					/></NuxtLink>
					<NuxtLink to="/events"
						><UButton
							icon="i-heroicons-calendar-days"
							size="sm"
							color="primary"
							variant="solid"
							label="Book your trip"
							:trailing="false"
					/></NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.relative {
	position: relative;
}

.absolute {
	position: absolute;
}

.inset-0 {
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

video {
	object-fit: cover;
}
</style>
