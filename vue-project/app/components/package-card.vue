<script setup>
defineProps({
    event: Object,
    included: Array,
    price: Number,
});
</script>

<template>
    <div class="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-400 bg-white dark:bg-slate-500 rounded-md">
        <h3>{{ event.title + " incl. " + included.join(", ") + " Package" }}</h3>
        <img class="h-full object-cover rounded-md" :src="event.image" :alt="event.title">
        <div class="flex flex-row justify-between px-4">
            <span class="underline">{{ "$" + (event.price + price) }}</span>
            <RoundButton>View</RoundButton>
        </div>
    </div>
</template>
