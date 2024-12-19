<script setup lang="ts">
const mealPlanPrices = {
  none: 0,
  breakfast: 150,
  half_board: 450,
  all_inclusive: 850,
};

const mealPlanString = (str: string) => {
  switch (str) {
    case "breakfast": {
      return "Breakfast";
    }
    case "half_board": {
      return "Half Board";
    }
    case "all_inclusive": {
      return "All Inclusive";
    }
    default: {
      return "Error";
    }
  }
};

const isModalOpen = ref(false);

const route = useRoute();
const id = route.params.id;

const loading = ref<boolean>(true);
const packageData = ref<any>();
const eventData = ref<any>();

const dateIndex = ref<number>(Number(route.query.di) || 0);
const numberPeople = reactive({
  adults: (Number(route.query.na) >= 1 ? Number(route.query.na) : 1) || 1, //Min 1
  children: (Number(route.query.nc) >= 0 ? Number(route.query.nc) : 0) || 0,
});

const router = useRouter();
watch([dateIndex, numberPeople], ([dateIndex, numberPeople], previous) => {
  router.push({
    path: `/packs/${id}`,
    query: {
      di: dateIndex,
      na: numberPeople.adults,
      nc: numberPeople.children,
    },
  });
});

const tripDuration = computed(() => {
  if (
    dateIndex.value >
    eventData.value?.hotels[packageData.value?.hotelId - 1]?.available_dates
      .length -
      1
  ) {
    dateIndex.value = 0;
  }

  return ~~(
    (new Date(
      eventData.value?.hotels[packageData.value?.hotelId - 1]?.available_dates[
        dateIndex.value || 0
      ].arrival_home_day
    ).getTime() -
      new Date(
        eventData.value?.hotels[
          packageData.value?.hotelId - 1
        ]?.available_dates[dateIndex.value || 0].date
      ).getTime()) /
    (1000 * 60 * 60 * 24)
  );
});
const hotelDays = computed(
  () => tripDuration.value - eventData.value?.estimated_flight_time_days
);

const totalPeople = computed(() => numberPeople.adults + numberPeople.children);
const totalPrice = computed(
  () =>
    ~~(
      ((mealPlanPrices[
        packageData.value?.mealPlan as
          | "none"
          | "breakfast"
          | "half_board"
          | "all_inclusive"
      ] +
        eventData.value?.hotels[packageData.value?.hotelId - 1]
          ?.price_per_day) *
        totalPeople.value *
        hotelDays.value +
        totalPeople.value * eventData.value?.flight_price) *
        packageData.value?.packageBaseDiscountMultiplier +
      packageData.value?.activity?.price
    )
);

const fetchPackageData = async () => {
  try {
    const packagesResponse = await fetch(
      `http://localhost:3001/packages?id=${id}`
    );
    if (!packagesResponse.ok) throw new Error("404, No package data found.");
    const packageResult = await packagesResponse.json();
    if (packageResult.length < 1)
      throw new Error("404, No package data found.");
    packageData.value = packageResult[0];

    const eventsResponse = await fetch(
      `http://localhost:3001/events?id=${packageData.value.eventId}`
    );
    if (!eventsResponse.ok) throw new Error("500, Package data is incomplete.");
    const eventsResult = await eventsResponse.json();
    if (eventsResult.length < 1)
      throw new Error("500, Package data is incomplete.");
    eventData.value = eventsResult[0];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

//If no/invalid query params, push default
onBeforeMount(() => {
  if (Object.keys(route.query).length != 3)
    router.push({
      path: `/packs/${id}`,
      query: {
        di: 0,
        na: 1,
        nc: 0,
      },
    });
});

onMounted(() => {
  fetchPackageData();
});
</script>

<template>
  <template v-if="loading">Loading...</template>
  <template v-else>
    <div class="flex flex-col gap-16">
      <div class="flex flex-col lg:flex-row-reverse justify-between gap-4">
        <div>
          <img
            class="rounded-lg"
            :src="eventData?.hotels[packageData?.hotelId - 1]?.image"
            :alt="eventData?.hotels[packageData?.hotelId - 1]?.name"
          />
        </div>
        <div class="flex flex-col gap-8 justify-center align-center h-100%">
          <h2 class="font-bold text-lg">
            {{ `${packageData?.name} | Package` }}
          </h2>
          <div class="flex flex-col">
            <h3 class="font-bold pb-1">Package contents</h3>
            <p>{{ `* ${eventData?.title}` }}</p>
            <p>
              {{ `* ${eventData?.hotels[packageData?.hotelId - 1]?.name}` }}
            </p>
            <template v-if="packageData?.flightIncluded">
              <p>* Flight included</p>
            </template>
            <template v-if="packageData?.mealPlan != 'none'">
              <p>{{ `* ${mealPlanString(packageData?.mealPlan)}` }}</p>
            </template>
            <template v-if="packageData?.activity?.name.length > 0">
              <p>{{ `* ${packageData?.activity?.name}` }}</p>
            </template>
          </div>
          <div class="flex flex-col">
            <h3 class="font-bold pb-1">Price breakdown</h3>
            <h4 class="font-bold pb-0.25">Package base</h4>
            <p>
              {{
                `* ${eventData?.hotels[packageData?.hotelId - 1]?.name}: $${
                  eventData?.hotels[packageData?.hotelId - 1]?.price_per_day
                }/day/person`
              }}
            </p>
            <template v-if="packageData?.mealPlan != 'none'">
              <p>
                {{
                  `* ${mealPlanString(packageData?.mealPlan)}: $${
                    mealPlanPrices[
                      packageData?.mealPlan as
                        | "none"
                        | "breakfast"
                        | "half_board"
                        | "all_inclusive"
                    ]
                  }/day/person`
                }}
              </p>
            </template>
            <template v-if="packageData?.flightIncluded">
              <p>{{ `* Flight: $${eventData.flight_price}/person` }}</p>
            </template>
            <h4 class="font-bold pb-0.25">Package exclusives</h4>
            <p>
              {{
                `* ${~~(
                  (1 - packageData?.packageBaseDiscountMultiplier) *
                  100
                )}% off "Package base"`
              }}
            </p>
            <template v-if="packageData?.activity?.name.length > 0">
              <p>
                {{
                  `* ${packageData?.activity?.name}: $${packageData?.activity?.price}`
                }}
              </p>
            </template>
            <span class="pt-4">
              <p>{{ `Trip duration: ${tripDuration} days` }}</p>
              <p>{{ `Days at hotel: ${hotelDays} days` }}</p>
              <p>{{ `Total: $${totalPrice}` }}</p>
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row justify-evenly gap-8">
        <span class="flex flex-col gap-2">
          <h3>People</h3>
          <span class="flex gap-2">
            {{ `Adults: ${numberPeople.adults}` }}
            <UButton
              size="xs"
              variant="solid"
              @click="() => numberPeople.adults++"
            >
              +
            </UButton>
            <UButton
              size="xs"
              variant="solid"
              @click="
                () => {
                  if (numberPeople.adults > 1) numberPeople.adults--;
                }
              "
            >
              -
            </UButton>
          </span>
          <span class="flex gap-2">
            {{ `Children: ${numberPeople.children}` }}
            <UButton
              size="xs"
              variant="solid"
              @click="() => numberPeople.children++"
            >
              +
            </UButton>
            <UButton
              size="xs"
              variant="solid"
              @click="
                () => {
                  if (numberPeople.children > 0) numberPeople.children--;
                }
              "
            >
              -
            </UButton>
          </span>
        </span>
        <span class="flex flex-col justify-center">
          <h3>Avalible dates</h3>
          <USelect
            v-model="dateIndex"
            :options="(
                eventData?.hotels[packageData?.hotelId - 1]
                  ?.available_dates as any[]
              ).map((hotelData, index) => {
                return { label: `${hotelData.date} to ${hotelData.arrival_home_day}`, value: index };
              })"
          />
        </span>
        <span class="flex flex-col justify-center">
          <UButton
            size="lg"
            variant="solid"
            class="text-md justify-center"
            @click="isModalOpen = true"
          >
            Book
          </UButton>
        </span>
      </div>
    </div>
  </template>
  <PackageBookingModal
    v-model="isModalOpen"
    :package-data="packageData"
    :event-data="eventData"
    :num-adults="numberPeople.adults"
    :num-children="numberPeople.children"
    :available-dates-index="dateIndex"
    :total-price="totalPrice"
  />
</template>

<style scoped></style>
