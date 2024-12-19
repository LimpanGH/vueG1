<script setup>
const loading = ref(false);
const error = ref(null);

const events = ref([]);
const packages = ref([]);

const fetchPackages = async () => {
  loading.value = true;
  error.value = null;

  try {
    const eventsResponse = await fetch("http://localhost:3001/events");
    events.value = await eventsResponse.json();

    const packagesResponse = await fetch("http://localhost:3001/packages");
    packages.value = await packagesResponse.json();

    //Inject event data
    packages.value = packages.value.map((pack) => {
      const event = events.value.find((event) => event.id == pack.eventId);
      pack["event"] = event || undefined;
      return pack;
    });

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
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <template v-if="!loading">
      <PackageCard
        v-for="pack in packages"
        :key="pack.id"
        :id="pack.id"
        :event-id="pack.eventId"
        :hotel-id="pack.hotelId"
        :name="pack.name"
        :meal-plan="pack.mealPlan"
        :flight-included="pack.flightIncluded"
        :package-base-discount-multiplier="pack.packageBaseDiscountMultiplier"
        :activity="pack.activity"
        :event="pack.event"
      />
    </template>
    <template v-else>
      <LoadingEventCard v-for="i in 3" :key="i" />
    </template>
  </section>
</template>
