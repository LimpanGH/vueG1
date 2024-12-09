<script setup>
import { ref } from 'vue';

const searchQuery = ref('');  // Store the search query

const cards = [
  {
    title: 'Event 1',
    description: 'This is event 1 description',
    image: 'image1.jpg',
    label: 'Event',
  },
  {
    title: 'Event 2',
    description: 'This is event 2 description',
    image: 'image2.jpg',
    label: 'Event',
  },
  // Add more items...
];

// Function to filter cards based on the search query
const filteredCards = computed(() => {
  return cards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
