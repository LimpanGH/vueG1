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
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchPackages());
</script>

<template>
  <section class="flex flex-col items-center">
    <div class="mt-12 mb-4">
      <h1 class="text-2xl font-bold text-center tracking-wider">
        Package Deals
      </h1>
      <p class="text-center tracking-wide">
        Enjoy activities & discounts exclusive to packages!
      </p>
    </div>
    <template v-if="!loading">
      <span class="flex flex-col gap-8 md:w-[80%] lg:w-[60%]">
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
      </span>
    </template>
    <template v-else>
      <LoadingEventCard v-for="i in 3" :key="i" />
    </template>
  </section>
</template>
