<script setup>
    defineProps({
        event: Object,
        included: Array,
        price: Number,
    });
</script>

<template>
    <div>
        {{ event }}
        {{ included }}
        {{ price }}
    </div>
</template>
