<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const loading = ref<boolean>(true);
const packageData = ref<any>();
const eventData = ref<any>();

const date = ref<any>(); //TODO: URL params

const mealPlanPrices = {
  none: 0,
  breakfast: 150,
  half_board: 450,
  all_inclusive: 850,
};

//TODO: URL params
const numberPeople = reactive({
  adults: 1, //TODO: min 1
  children: 0,
});

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

    // console.log(eventData.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
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

onMounted(() => {
  fetchPackageData();
});
</script>

<template>
  <template v-if="loading">Loading...</template>
  <template v-else>
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col gap-8 justify-center align-center h-100%">
          <h2>{{ `${packageData?.name} | Package` }}</h2>
          <div class="flex flex-col">
            <h3 class="font-bold pb-1">Package contents</h3>
            <template v-if="packageData?.mealPlan != 'none'">
              <p>{{ `* ${mealPlanString(packageData?.mealPlan)}` }}</p>
            </template>
            <template v-if="packageData?.flightIncluded">
              <p>* Flight included</p>
            </template>
            <template v-if="packageData?.activity?.name.length > 0">
              <p>{{ `* ${packageData?.activity?.name}` }}</p>
            </template>
          </div>
          <div class="flex flex-col">
            <h3 class="font-bold pb-1">Price breakdown</h3>
            <h4 class="font-bold pb-0.25">Package base</h4>
            <p>{{ `* ${eventData?.title}: $?` }}</p>
            <p>
              {{
                `* ${eventData?.hotels[packageData?.hotelId - 1]?.name}: $${
                  eventData?.hotels[packageData?.hotelId - 1]?.price_per_day
                }/day`
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
              <p>{{ `* Flight: $${eventData.flight_price}` }}</p>
            </template>
            <template v-if="packageData?.activity?.name.length > 0">
              <h4 class="font-bold pb-0.25">Package exclusives</h4>
              <p>
                {{
                  `* ${~~(
                    (1 - packageData?.packageBaseDiscountMultiplier) *
                    100
                  )}% off "Package base"`
                }}
              </p>
              <p>
                {{
                  `* ${packageData?.activity?.name}: $${packageData?.activity?.price}`
                }}
              </p>
            </template>
            <span class="pt-4">
              <p>Days: ?</p>
              <p>Total: $?</p>
            </span>
          </div>
        </div>
        <div>
          <img
            class="rounded-lg"
            :src="eventData?.hotels[packageData?.hotelId - 1]?.image"
            :alt="eventData?.hotels[packageData?.hotelId - 1]?.name"
          />
        </div>
      </div>
      <div class="flex flex-row justify-evenly">
        <span>
          <h3>People</h3>
          <span>
            {{ `Adults: ${numberPeople.adults}` }}
            <button type="button">+</button>
            <button type="button">-</button>
          </span>
          <span>
            {{ `Children: ${numberPeople.children}` }}
            <button type="button">+</button>
            <button type="button">-</button>
          </span>
        </span>
        <span>
          <h3>Avalible dates</h3>
          <USelect
            v-model="date"
            :options="(
                eventData?.hotels[packageData?.hotelId - 1]
                  ?.available_dates as any[]
              ).map((date) => {
                return date.date;
              })"
            placeholder="Select date..."
          />
        </span>
        <UButton size="sm" variant="solid"> Book </UButton>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
