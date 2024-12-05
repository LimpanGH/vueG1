<script setup>
    const loading = ref(false);
    const error = ref(null);
    
    const events = ref([]);
    const packages = ref([]);

    const fetchPackages = async () => {
	loading.value = true;
	error.value = null;

	try {
        const eventsResponse = await fetch('http://localhost:3001/events');
		events.value = await eventsResponse.json();

		const packagesResponse = await fetch('http://localhost:3001/packages');
		packages.value = await packagesResponse.json();

        //Inject event data
        packages.value = packages.value.map(pack => {
            const event = events.value.find(event => event.id == pack.eventId);
            pack["event"] = event || undefined;
            return pack;
        })

        //Select 3 at random
        packages.value = packages.value.sort(() => 0.5 - Math.random()).slice(0, 3);
	} catch (e) {
		error.value = e;
	} finally {
		loading.value = false;
	}
};

    onMounted(() => fetchPackages());
</script>

<template>
    <PackageCard
        v-for="pack in packages"
        :key="pack.id"
        :event="pack.event"
        :included="pack.included"
        :price="pack.priceExcBase"
    />
</template>
